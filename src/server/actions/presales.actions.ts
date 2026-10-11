"use server";

import { connectDB } from "@/lib/db";
import Presales from "@/models/presales.model";
import { revalidatePath } from "next/cache";
import { PresalesItem, PresalesDashboardMetrics } from "@/modules/presales/presales.types";
import { DEMO_PRESALES_ITEMS } from "@/modules/presales/presales.constants";

export async function getPresalesItems(stage?: string, query?: string): Promise<PresalesItem[]> {
  try {
    await connectDB();
    const filter: any = {};
    if (stage && stage !== "All") {
      filter.stage = stage;
    }
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { clientName: { $regex: query, $options: "i" } },
        { contactPerson: { $regex: query, $options: "i" } },
        { techStack: { $regex: query, $options: "i" } },
      ];
    }

    const items = await Presales.find(filter).sort({ updatedAt: -1 }).lean();
    if (!items || items.length === 0) {
      return DEMO_PRESALES_ITEMS.filter((item) => {
        const matchesStage = !stage || stage === "All" || item.stage === stage;
        const matchesQuery =
          !query ||
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.clientName.toLowerCase().includes(query.toLowerCase()) ||
          item.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase()));
        return matchesStage && matchesQuery;
      });
    }

    return JSON.parse(JSON.stringify(items));
  } catch (error) {
    console.warn("DB offline or error loading presales items; using fallback demo items:", error);
    return DEMO_PRESALES_ITEMS.filter((item) => {
      const matchesStage = !stage || stage === "All" || item.stage === stage;
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.clientName.toLowerCase().includes(query.toLowerCase()) ||
        item.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesStage && matchesQuery;
    });
  }
}

export async function getPresalesDashboardMetrics(): Promise<PresalesDashboardMetrics> {
  try {
    await connectDB();
    const items = await Presales.find().lean();
    const dataList = items && items.length > 0 ? items : DEMO_PRESALES_ITEMS;

    const scopingCount = dataList.filter((i) => i.stage === "Requirement").length;
    const estimationCount = dataList.filter((i) => i.stage === "Estimation").length;
    const proposalCount = dataList.filter((i) => i.stage === "Proposal").length;
    const quotationCount = dataList.filter((i) => i.stage === "Quotation").length;
    const negotiationCount = dataList.filter((i) => i.stage === "Negotiation").length;
    const approvedCount = dataList.filter((i) => i.stage === "Approved").length;

    const totalPipelineValue = dataList.reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0);
    const totalEstimatedHours = dataList.reduce(
      (acc, curr) => acc + (curr.totalEffortHours || 0),
      0
    );
    const averageMarginPercent = Math.round(
      dataList.reduce((acc, curr) => acc + (curr.targetMarginPercent || 35), 0) /
        (dataList.length || 1)
    );

    return {
      totalPresalesDecks: dataList.length,
      scopingCount,
      estimationCount,
      proposalCount,
      quotationCount,
      negotiationCount,
      approvedCount,
      totalPipelineValue,
      totalEstimatedHours,
      averageMarginPercent,
      averageTurnaroundDays: 3.4,
    };
  } catch (error) {
    console.warn("Using demo metrics for Presales due to:", error);
    const dataList = DEMO_PRESALES_ITEMS;
    return {
      totalPresalesDecks: dataList.length,
      scopingCount: dataList.filter((i) => i.stage === "Requirement").length,
      estimationCount: dataList.filter((i) => i.stage === "Estimation").length,
      proposalCount: dataList.filter((i) => i.stage === "Proposal").length,
      quotationCount: dataList.filter((i) => i.stage === "Quotation").length,
      negotiationCount: dataList.filter((i) => i.stage === "Negotiation").length,
      approvedCount: dataList.filter((i) => i.stage === "Approved").length,
      totalPipelineValue: dataList.reduce((acc, curr) => acc + curr.estimatedValue, 0),
      totalEstimatedHours: dataList.reduce((acc, curr) => acc + curr.totalEffortHours, 0),
      averageMarginPercent: 38,
      averageTurnaroundDays: 3.4,
    };
  }
}

export async function createPresalesRequirement(formData: Partial<PresalesItem>) {
  try {
    await connectDB();
    const created = await Presales.create({
      ...formData,
      stage: formData.stage || "Requirement",
      quotationNumber:
        formData.quotationNumber || `WX-Q-2026-${Math.floor(100 + Math.random() * 900)}`,
    });

    revalidatePath("/dashboard/presales");
    revalidatePath("/dashboard/presales/requirements");
    return { success: true, item: JSON.parse(JSON.stringify(created)) };
  } catch (error: any) {
    console.error("Error creating presales requirement:", error);
    return { success: false, error: error.message };
  }
}

export async function updatePresalesStage(id: string, newStage: PresalesItem["stage"]) {
  try {
    await connectDB();
    const updated = await Presales.findByIdAndUpdate(
      id,
      { stage: newStage, updatedAt: new Date() },
      { new: true }
    );

    revalidatePath("/dashboard/presales");
    return { success: true, item: JSON.parse(JSON.stringify(updated)) };
  } catch (error: any) {
    console.error("Error updating presales stage:", error);
    return { success: false, error: error.message };
  }
}

export async function updatePresalesEstimation(
  id: string,
  estimationModules: any[],
  hourlyRate: number,
  targetMarginPercent: number
) {
  try {
    await connectDB();
    const totalHours = estimationModules.reduce((acc, curr) => acc + (Number(curr.hours) || 0), 0);
    const estimatedValue = totalHours * (hourlyRate || 2500);

    const updated = await Presales.findByIdAndUpdate(
      id,
      {
        estimationModules,
        totalEffortHours: totalHours,
        hourlyRate,
        targetMarginPercent,
        estimatedValue,
        stage: "Proposal",
        updatedAt: new Date(),
      },
      { new: true }
    );

    revalidatePath("/dashboard/presales");
    revalidatePath("/dashboard/presales/estimates");
    return { success: true, item: JSON.parse(JSON.stringify(updated)) };
  } catch (error: any) {
    console.error("Error updating presales estimation:", error);
    return { success: false, error: error.message };
  }
}

export async function submitNegotiationNote(id: string, noteData: any) {
  try {
    await connectDB();
    const updated = await Presales.findByIdAndUpdate(
      id,
      {
        $push: { negotiationLogs: noteData },
        updatedAt: new Date(),
      },
      { new: true }
    );

    revalidatePath("/dashboard/presales");
    revalidatePath("/dashboard/presales/quotations");
    return { success: true, item: JSON.parse(JSON.stringify(updated)) };
  } catch (error: any) {
    console.error("Error submitting negotiation note:", error);
    return { success: false, error: error.message };
  }
}

export async function handoverToProject(id: string) {
  try {
    await connectDB();
    const updated = await Presales.findByIdAndUpdate(
      id,
      {
        stage: "Approved",
        updatedAt: new Date(),
      },
      { new: true }
    );

    revalidatePath("/dashboard/presales");
    revalidatePath("/dashboard/projects");
    return { success: true, item: JSON.parse(JSON.stringify(updated)) };
  } catch (error: any) {
    console.error("Error handing over to project delivery:", error);
    return { success: false, error: error.message };
  }
}
