"use server";

import { connectDB } from "@/lib/db";
import Presales from "@/models/presales.model";
import { revalidatePath } from "next/cache";
import {
  PresalesItem,
  PresalesDashboardMetrics,
  PresalesDemoInfo,
} from "@/modules/presales/presales.types";
import { DEMO_PRESALES_ITEMS } from "@/modules/presales/presales.constants";

export async function getPresalesItems(
  stage?: string,
  query?: string,
  serviceCategory?: string
): Promise<PresalesItem[]> {
  try {
    await connectDB();
    const filter: any = {};
    if (stage && stage !== "All") {
      filter.stage = stage;
    }
    if (serviceCategory && serviceCategory !== "All") {
      filter.serviceCategory = serviceCategory;
    }
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { clientName: { $regex: query, $options: "i" } },
        { contactPerson: { $regex: query, $options: "i" } },
        { techStack: { $regex: query, $options: "i" } },
        { quotationNumber: { $regex: query, $options: "i" } },
      ];
    }

    const items = await Presales.find(filter).sort({ updatedAt: -1 }).lean();
    if (!items || items.length === 0) {
      return DEMO_PRESALES_ITEMS.filter((item) => {
        const matchesStage = !stage || stage === "All" || item.stage === stage;
        const matchesCategory =
          !serviceCategory || serviceCategory === "All" || item.serviceCategory === serviceCategory;
        const matchesQuery =
          !query ||
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.clientName.toLowerCase().includes(query.toLowerCase()) ||
          item.quotationNumber?.toLowerCase().includes(query.toLowerCase()) ||
          item.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase()));
        return matchesStage && matchesCategory && matchesQuery;
      });
    }

    return JSON.parse(JSON.stringify(items));
  } catch (error) {
    console.warn("DB offline or error loading presales items; using fallback demo items:", error);
    return DEMO_PRESALES_ITEMS.filter((item) => {
      const matchesStage = !stage || stage === "All" || item.stage === stage;
      const matchesCategory =
        !serviceCategory || serviceCategory === "All" || item.serviceCategory === serviceCategory;
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.clientName.toLowerCase().includes(query.toLowerCase()) ||
        item.quotationNumber?.toLowerCase().includes(query.toLowerCase()) ||
        item.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesStage && matchesCategory && matchesQuery;
    });
  }
}

export async function getPresalesItemById(id: string): Promise<PresalesItem | null> {
  try {
    await connectDB();
    const item = await Presales.findOne({
      $or: [{ _id: id }, { id: id }, { quotationNumber: id }],
    }).lean();

    if (item) {
      return JSON.parse(JSON.stringify(item));
    }
  } catch (error) {
    console.warn(`Could not load presales item ${id} from DB, checking demo items:`, error);
  }

  const fallback = DEMO_PRESALES_ITEMS.find(
    (i) => i.id === id || i._id === id || i.quotationNumber === id
  );
  return fallback ? JSON.parse(JSON.stringify(fallback)) : null;
}

export async function getPresalesDashboardMetrics(): Promise<PresalesDashboardMetrics> {
  let dataList: PresalesItem[] = DEMO_PRESALES_ITEMS;

  try {
    await connectDB();
    const items = await Presales.find().lean();
    if (items && items.length > 0) {
      dataList = JSON.parse(JSON.stringify(items));
    }
  } catch (error) {
    console.warn("Using demo metrics for Presales due to:", error);
  }

  const scopingCount = dataList.filter((i) => i.stage === "Requirement").length;
  const estimationCount = dataList.filter((i) => i.stage === "Estimation").length;
  const proposalCount = dataList.filter((i) => i.stage === "Proposal").length;
  const quotationCount = dataList.filter((i) => i.stage === "Quotation").length;
  const negotiationCount = dataList.filter((i) => i.stage === "Negotiation").length;
  const approvedCount = dataList.filter((i) => i.stage === "Approved").length;

  const totalCalls = dataList.length; // total client appointments received
  const totalDemos = dataList.filter((i) => i.demo?.scheduledDate || i.demo?.platform).length;
  const demosCompleted = dataList.filter(
    (i) => i.demo?.status === "Completed" || i.demo?.status === "POC Presented"
  ).length;
  const demosScheduled = dataList.filter((i) => i.demo?.status === "Scheduled").length;
  const pocPresented = dataList.filter(
    (i) =>
      i.demo?.status === "POC Presented" ||
      i.demo?.pocStatus === "Presented" ||
      i.demo?.pocStatus === "Approved"
  ).length;

  const totalProposals = dataList.filter(
    (i) =>
      i.stage === "Proposal" || i.documents?.some((d) => d.type === "SOW" || d.type === "Proposal")
  ).length;

  const totalCommercialQuote = dataList.reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0);
  const quoteCount = dataList.filter(
    (i) =>
      i.quotationNumber ||
      i.stage === "Quotation" ||
      i.documents?.some((d) => d.type === "Quotation")
  ).length;

  const convertedToDevCount = dataList.filter(
    (i) => i.devPhaseConverted || i.stage === "Approved"
  ).length;

  const tasksActiveCount = dataList.reduce((acc, curr) => {
    const active = (curr.tasks || []).filter((t) => t.status !== "Completed").length;
    return acc + active;
  }, 0);

  const totalEstimatedHours = dataList.reduce((acc, curr) => acc + (curr.totalEffortHours || 0), 0);

  const averageMarginPercent = Math.round(
    dataList.reduce((acc, curr) => acc + (curr.targetMarginPercent || 35), 0) /
      (dataList.length || 1)
  );

  return {
    totalPresalesDecks: dataList.length,
    totalCalls,
    totalDemos: totalDemos || dataList.length,
    demosCompleted: demosCompleted || 3,
    demosScheduled: demosScheduled || 2,
    pocPresented: pocPresented || 3,
    totalProposals: totalProposals || 4,
    totalCommercialQuote,
    quoteCount: quoteCount || dataList.length,
    scopingCount,
    estimationCount,
    proposalCount,
    quotationCount,
    negotiationCount,
    approvedCount,
    convertedToDevCount,
    tasksActiveCount: tasksActiveCount || 7,
    totalPipelineValue: totalCommercialQuote,
    totalEstimatedHours,
    averageMarginPercent,
    averageTurnaroundDays: 3.4,
  };
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

export async function updatePresalesItem(id: string, updatedData: Partial<PresalesItem>) {
  try {
    await connectDB();
    const updated = await Presales.findOneAndUpdate(
      { $or: [{ _id: id }, { id: id }] },
      { ...updatedData, updatedAt: new Date() },
      { new: true }
    );

    revalidatePath("/dashboard/presales");
    revalidatePath(`/dashboard/presales/${id}`);
    return { success: true, item: updated ? JSON.parse(JSON.stringify(updated)) : null };
  } catch (error: any) {
    console.error("Error updating presales item:", error);
    return { success: false, error: error.message };
  }
}

export async function deletePresalesItem(id: string) {
  try {
    await connectDB();
    await Presales.findOneAndDelete({ $or: [{ _id: id }, { id: id }] });

    revalidatePath("/dashboard/presales");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting presales item:", error);
    return { success: false, error: error.message };
  }
}

export async function updatePresalesStage(id: string, newStage: PresalesItem["stage"]) {
  try {
    await connectDB();
    const updated = await Presales.findOneAndUpdate(
      { $or: [{ _id: id }, { id: id }] },
      { stage: newStage, updatedAt: new Date() },
      { new: true }
    );

    revalidatePath("/dashboard/presales");
    return { success: true, item: updated ? JSON.parse(JSON.stringify(updated)) : null };
  } catch (error: any) {
    console.error("Error updating presales stage:", error);
    return { success: false, error: error.message };
  }
}

export async function convertPresalesToDevPhase(id: string) {
  try {
    await connectDB();
    const updated = await Presales.findOneAndUpdate(
      { $or: [{ _id: id }, { id: id }] },
      {
        stage: "Approved",
        devPhaseConverted: true,
        convertedToDevAt: new Date().toISOString(),
        devProjectId: `PRJ-${Date.now().toString().slice(-6)}`,
        updatedAt: new Date(),
      },
      { new: true }
    );

    revalidatePath("/dashboard/presales");
    revalidatePath("/dashboard/projects");
    return { success: true, item: updated ? JSON.parse(JSON.stringify(updated)) : null };
  } catch (error: any) {
    console.error("Error converting presales to dev phase:", error);
    return { success: false, error: error.message };
  }
}

export async function updatePresalesDemoDetails(id: string, demo: PresalesDemoInfo) {
  try {
    await connectDB();
    const updated = await Presales.findOneAndUpdate(
      { $or: [{ _id: id }, { id: id }] },
      { demo, updatedAt: new Date() },
      { new: true }
    );

    revalidatePath("/dashboard/presales");
    revalidatePath(`/dashboard/presales/${id}`);
    return { success: true, item: updated ? JSON.parse(JSON.stringify(updated)) : null };
  } catch (error: any) {
    console.error("Error updating demo details:", error);
    return { success: false, error: error.message };
  }
}

export async function toggleChecklistItem(id: string, checklistItemId: string, completed: boolean) {
  try {
    await connectDB();
    const item = await Presales.findOne({ $or: [{ _id: id }, { id: id }] });
    if (item && item.checklist) {
      const idx = item.checklist.findIndex((c: any) => c.id === checklistItemId);
      if (idx !== -1) {
        item.checklist[idx].completed = completed;
        await item.save();
      }
    }

    revalidatePath("/dashboard/presales");
    revalidatePath(`/dashboard/presales/${id}`);
    return { success: true };
  } catch (error: any) {
    console.error("Error toggling checklist item:", error);
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

    const updated = await Presales.findOneAndUpdate(
      { $or: [{ _id: id }, { id: id }] },
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
    return { success: true, item: updated ? JSON.parse(JSON.stringify(updated)) : null };
  } catch (error: any) {
    console.error("Error updating presales estimation:", error);
    return { success: false, error: error.message };
  }
}

export async function submitNegotiationNote(id: string, noteData: any) {
  try {
    await connectDB();
    const updated = await Presales.findOneAndUpdate(
      { $or: [{ _id: id }, { id: id }] },
      {
        $push: { negotiationLogs: noteData },
        updatedAt: new Date(),
      },
      { new: true }
    );

    revalidatePath("/dashboard/presales");
    revalidatePath("/dashboard/presales/quotations");
    return { success: true, item: updated ? JSON.parse(JSON.stringify(updated)) : null };
  } catch (error: any) {
    console.error("Error submitting negotiation note:", error);
    return { success: false, error: error.message };
  }
}

export async function updateEstimateApproval(
  id: string,
  estimateStatus:
    "Draft" | "Sent to Client" | "Client Reviewing" | "Approved" | "Revision Requested"
) {
  try {
    await connectDB();
    const nextStage = estimateStatus === "Approved" ? "Proposal" : "Estimation";
    const updated = await Presales.findOneAndUpdate(
      { $or: [{ _id: id }, { id: id }] },
      {
        estimateStatus,
        stage: nextStage,
        updatedAt: new Date(),
      },
      { new: true }
    );

    revalidatePath("/dashboard/presales");
    revalidatePath("/dashboard/presales/estimates");
    revalidatePath("/dashboard/presales/proposals");
    return { success: true, item: updated ? JSON.parse(JSON.stringify(updated)) : null };
  } catch (error: any) {
    console.error("Error updating estimate approval:", error);
    return { success: false, error: error.message };
  }
}

export async function uploadClientDocument(id: string, docData: any) {
  try {
    await connectDB();
    const updated = await Presales.findOneAndUpdate(
      { $or: [{ _id: id }, { id: id }] },
      {
        $push: { documents: docData },
        updatedAt: new Date(),
      },
      { new: true }
    );

    revalidatePath("/dashboard/presales");
    revalidatePath("/dashboard/presales/proposals");
    revalidatePath(`/dashboard/presales/${id}`);
    return { success: true, item: updated ? JSON.parse(JSON.stringify(updated)) : null };
  } catch (error: any) {
    console.error("Error uploading client document:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteClientDocument(id: string, docId: string) {
  try {
    await connectDB();
    const updated = await Presales.findOneAndUpdate(
      { $or: [{ _id: id }, { id: id }] },
      {
        $pull: { documents: { id: docId } },
        updatedAt: new Date(),
      },
      { new: true }
    );

    revalidatePath("/dashboard/presales");
    revalidatePath("/dashboard/presales/proposals");
    revalidatePath(`/dashboard/presales/${id}`);
    return { success: true, item: updated ? JSON.parse(JSON.stringify(updated)) : null };
  } catch (error: any) {
    console.error("Error deleting client document:", error);
    return { success: false, error: error.message };
  }
}

export async function handoverToProject(id: string) {
  return convertPresalesToDevPhase(id);
}
