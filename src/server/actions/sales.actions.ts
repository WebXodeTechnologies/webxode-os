"use server";

import { connectDB } from "@/lib/db";
import Lead from "@/models/lead.model";
import LeadActivity from "@/models/leadActivity.model";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

// TODO: Replace with real user ID from your session context/auth provider
const getMockUserId = () => new mongoose.Types.ObjectId("60d5ecb54b2b2b1b3c9b1b1a");

export async function createLead(data: any) {
  try {
    await connectDB();
    const newLead = await Lead.create({
      ...data,
      salesOwner: getMockUserId(),
    });
    revalidatePath("/dashboard/sales");
    return { success: true, lead: JSON.parse(JSON.stringify(newLead)) };
  } catch (error: any) {
    console.error("Error creating lead:", error);
    return { success: false, error: error.message };
  }
}

export async function getLeads(query?: string, stage?: string) {
  try {
    await connectDB();
    const filter: any = {};
    if (stage && stage !== "All") filter.stage = stage;
    if (query) {
      filter.$or = [
        { companyName: { $regex: query, $options: "i" } },
        { contactPerson: { $regex: query, $options: "i" } },
      ];
    }
    const leads = await Lead.find(filter).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(leads));
  } catch (error) {
    console.error("Error fetching leads:", error);
    return [];
  }
}

export async function getSalesDashboardMetrics() {
  try {
    await connectDB();

    // Total Leads
    const totalLeads = await Lead.countDocuments();

    // Active Leads (Not Won, Lost, Dead)
    const activeLeads = await Lead.countDocuments({
      stage: { $in: ["Enquiry", "Qualified", "Proposal"] },
    });

    // Pipeline Value
    const leadsWithValues = await Lead.find({
      stage: { $in: ["Enquiry", "Qualified", "Proposal"] },
    })
      .select("estimatedValue")
      .lean();
    const pipelineValue = leadsWithValues.reduce(
      (acc, curr) => acc + (curr.estimatedValue || 0),
      0
    );

    // Upcoming Tasks (next 7 days)
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    // Aggregate to get tasks
    const leadsWithTasks = await Lead.find({
      "tasks.completed": false,
      "tasks.dueDate": { $lte: nextWeek },
    })
      .select("companyName contactPerson tasks")
      .lean();

    let upcomingTasks: any[] = [];
    leadsWithTasks.forEach((lead) => {
      lead.tasks.forEach((task) => {
        if (!task.completed && new Date(task.dueDate) <= nextWeek) {
          upcomingTasks.push({
            leadId: lead._id,
            companyName: lead.companyName,
            contactPerson: lead.contactPerson,
            title: task.title,
            dueDate: task.dueDate,
          });
        }
      });
    });

    // Sort tasks by due date
    upcomingTasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    upcomingTasks = upcomingTasks.slice(0, 5); // top 5

    // Recent Activities
    const recentActivities = await LeadActivity.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("leadId", "companyName")
      .lean();

    return {
      success: true,
      data: JSON.parse(
        JSON.stringify({
          totalLeads,
          activeLeads,
          pipelineValue,
          upcomingTasks,
          recentActivities,
        })
      ),
    };
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return { success: false, data: null };
  }
}

export async function getLeadById(id: string) {
  try {
    await connectDB();
    if (!mongoose.Types.ObjectId.isValid(id)) return null;

    const lead = await Lead.findById(id).lean();
    if (!lead) return null;

    const activities = await LeadActivity.find({ leadId: id }).sort({ createdAt: -1 }).lean();

    return {
      lead: JSON.parse(JSON.stringify(lead)),
      activities: JSON.parse(JSON.stringify(activities)),
    };
  } catch (error) {
    console.error("Error fetching lead by id:", error);
    return null;
  }
}

export async function updateLeadStage(id: string, stage: string, lossReason?: string) {
  try {
    await connectDB();
    const updateData: any = { stage };
    if (lossReason) updateData.lossReason = lossReason;

    await Lead.findByIdAndUpdate(id, updateData);
    revalidatePath(`/dashboard/sales/leads/${id}`);
    revalidatePath("/dashboard/sales");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function addLeadActivity(
  leadId: string,
  type: "Call" | "Mail" | "Meeting" | "Note",
  content: string,
  durationSeconds?: number
) {
  try {
    await connectDB();
    const activity = await LeadActivity.create({
      leadId,
      authorId: getMockUserId(),
      type,
      content,
      durationSeconds,
    });
    revalidatePath(`/dashboard/sales/leads/${leadId}`);
    return { success: true, activity: JSON.parse(JSON.stringify(activity)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function addLeadTask(leadId: string, title: string, dueDate: Date) {
  try {
    await connectDB();
    await Lead.findByIdAndUpdate(leadId, {
      $push: { tasks: { title, completed: false, dueDate } },
    });
    revalidatePath(`/dashboard/sales/leads/${leadId}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function toggleLeadTask(leadId: string, taskId: string, completed: boolean) {
  try {
    await connectDB();
    await Lead.findOneAndUpdate(
      { _id: leadId, "tasks._id": taskId },
      { $set: { "tasks.$.completed": completed } }
    );
    revalidatePath(`/dashboard/sales/leads/${leadId}`);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
