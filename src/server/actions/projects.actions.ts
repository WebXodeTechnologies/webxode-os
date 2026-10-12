"use server";

import { connectDB } from "@/lib/db";
import Project from "@/models/project.model";
import { revalidatePath } from "next/cache";
import {
  ProjectItem,
  ProjectsDashboardMetrics,
  SprintItem,
  SprintTaskItem,
  DevOpsPipelineRun,
  ProjectCloudResource,
  ProjectDevOpsItem,
  ProjectDiscussionNote,
  ProjectTeamMember,
  ProjectDesignSpec,
  ProjectRepository,
} from "@/modules/projects/project.types";
import {
  DEMO_PROJECT_ITEMS,
  DEMO_PROJECTS_METRICS,
  DEMO_SPRINTS,
  DEMO_PIPELINE_RUNS,
} from "@/modules/projects/project.constants";

export async function getProjects(
  phase?: string,
  category?: string,
  query?: string
): Promise<ProjectItem[]> {
  try {
    await connectDB();
    const filter: any = {};
    if (phase && phase !== "All") {
      filter.phase = phase;
    }
    if (category && category !== "All") {
      filter.serviceCategory = category;
    }
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { clientName: { $regex: query, $options: "i" } },
        { projectCode: { $regex: query, $options: "i" } },
        { techStack: { $regex: query, $options: "i" } },
        { projectManager: { $regex: query, $options: "i" } },
        { techLead: { $regex: query, $options: "i" } },
      ];
    }

    const items = await Project.find(filter).sort({ updatedAt: -1 }).lean();
    if (!items || items.length === 0) {
      return DEMO_PROJECT_ITEMS.filter((item) => {
        const matchesPhase = !phase || phase === "All" || item.phase === phase;
        const matchesCategory =
          !category || category === "All" || item.serviceCategory === category;
        const matchesQuery =
          !query ||
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.clientName.toLowerCase().includes(query.toLowerCase()) ||
          item.projectCode.toLowerCase().includes(query.toLowerCase()) ||
          item.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase()));
        return matchesPhase && matchesCategory && matchesQuery;
      });
    }

    return JSON.parse(JSON.stringify(items));
  } catch (error) {
    console.warn("DB offline or error loading projects; falling back to demo items:", error);
    return DEMO_PROJECT_ITEMS.filter((item) => {
      const matchesPhase = !phase || phase === "All" || item.phase === phase;
      const matchesCategory = !category || category === "All" || item.serviceCategory === category;
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.clientName.toLowerCase().includes(query.toLowerCase()) ||
        item.projectCode.toLowerCase().includes(query.toLowerCase()) ||
        item.techStack.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesPhase && matchesCategory && matchesQuery;
    });
  }
}

export async function getProjectById(id: string): Promise<ProjectItem | null> {
  try {
    await connectDB();
    const item = await Project.findOne({
      $or: [{ _id: id }, { id: id }, { projectCode: id }],
    }).lean();

    if (item) {
      return JSON.parse(JSON.stringify(item));
    }
  } catch (error) {
    console.warn("Error fetching project by ID, checking demo seeds:", error);
  }

  const demoItem =
    DEMO_PROJECT_ITEMS.find((p) => p.id === id || p._id === id || p.projectCode === id) || null;
  return demoItem;
}

export async function getProjectsDashboardMetrics(): Promise<ProjectsDashboardMetrics> {
  try {
    await connectDB();
    const count = await Project.countDocuments();
    if (count > 0) {
      const projects = await Project.find().lean();
      const totalBudgetHours = projects.reduce((acc, p) => acc + (p.budgetHours || 0), 0);
      const totalConsumedHours = projects.reduce((acc, p) => acc + (p.consumedHours || 0), 0);
      const totalContractValue = projects.reduce((acc, p) => acc + (p.contractValue || 0), 0);
      const onTrackCount = projects.filter((p) => p.status === "On Track").length;

      let envHealthy = 0;
      let envTotal = 0;
      projects.forEach((p) => {
        (p.environments || []).forEach((e: any) => {
          envTotal++;
          if (e.status === "Healthy") envHealthy++;
        });
      });

      return {
        totalProjects: projects.length,
        activeProjects: projects.filter((p) => p.phase !== "Maintenance").length,
        onTrackRatePercent: Math.round((onTrackCount / projects.length) * 100),
        totalBudgetHours,
        totalConsumedHours,
        totalContractValue,
        environmentsHealthyCount: envHealthy,
        environmentsTotalCount: envTotal,
        criticalBlockersCount: projects.filter(
          (p) => p.status === "Delayed" || p.status === "At Risk"
        ).length,
        securityGradeAvg: "A",
      };
    }
  } catch (error) {
    console.warn("Error calculating project metrics; using demo metrics:", error);
  }

  return DEMO_PROJECTS_METRICS;
}

export async function createProject(projectData: Partial<ProjectItem>) {
  try {
    await connectDB();
    const projectCode =
      projectData.projectCode || `PRJ-CORP-${Math.floor(100 + Math.random() * 900)}`;

    const newProject = await Project.create({
      ...projectData,
      projectCode,
      progress: projectData.progress ?? 0,
      phase: projectData.phase || "In Development",
      status: projectData.status || "On Track",
      repositories: projectData.repositories || [],
      designSpecs: projectData.designSpecs || [],
      cloudResources: projectData.cloudResources || [
        {
          id: `cres_${Date.now()}_1`,
          provider: "AWS",
          type: "EC2 Compute",
          name: `${projectCode.toLowerCase()}-api-worker`,
          resourceId: `i-${Math.random().toString(36).substring(2, 10)}`,
          region: "us-east-1",
          status: "Running",
          purpose: "Primary backend API compute cluster",
          costPerMonth: 85,
        },
        {
          id: `cres_${Date.now()}_2`,
          provider: "AWS",
          type: "S3 Storage",
          name: `s3-${projectCode.toLowerCase()}-assets`,
          resourceId: `arn:aws:s3:::${projectCode.toLowerCase()}-assets`,
          region: "us-east-1",
          status: "Provisioned",
          purpose: "Application assets & customer documents",
          costPerMonth: 25,
        },
      ],
      devopsLogs: projectData.devopsLogs || [
        {
          id: `devops_${Date.now()}_1`,
          title: "Initial AWS EC2 compute instance & S3 asset bucket provisioned",
          category: "Infrastructure",
          status: "Completed",
          updatedBy: "DevOps Engineer",
          date: new Date().toISOString().split("T")[0],
          notes: "Security groups configured with restricted port 443 access.",
        },
      ],
      discussions: projectData.discussions || [
        {
          id: `disc_${Date.now()}_1`,
          author: projectData.projectManager || "Project Manager",
          role: "PM",
          text: `Project initiated. SOW scope baseline established for ${projectData.clientName}.`,
          createdAt: new Date().toLocaleString(),
        },
      ],
      environments: projectData.environments || [
        {
          name: "Development",
          url: `https://dev-${projectCode.toLowerCase()}.webxode.internal`,
          status: "Healthy",
          lastDeployed: "Just now",
          releaseTag: "v0.1.0-alpha",
          cloudProvider: "AWS",
          region: "us-east-1",
          uptimePercent: 100,
        },
        {
          name: "Staging / UAT",
          url: `https://staging-${projectCode.toLowerCase()}.webxode.internal`,
          status: "Deploying",
          lastDeployed: "Initializing",
          releaseTag: "v0.1.0-rc",
          cloudProvider: "AWS",
          region: "us-east-1",
          uptimePercent: 99.9,
        },
      ],
      devSecOps: projectData.devSecOps || {
        securityScore: "A",
        openCvesCount: 0,
        criticalVulnerabilities: 0,
        highVulnerabilities: 0,
        sonarQubeRating: "A",
        testCoveragePercent: 85,
        sslDaysRemaining: 90,
        uptimePercentage: 99.9,
        complianceTags: ["OWASP Top 10", "SOC2 Type II"],
      },
      teamMembers: projectData.teamMembers || [],
    });

    revalidatePath("/dashboard/projects");
    revalidatePath("/dashboard/projects/sprints");
    revalidatePath("/dashboard/projects/devops");
    revalidatePath("/dashboard/projects/design");
    return { success: true, project: JSON.parse(JSON.stringify(newProject)) };
  } catch (error: any) {
    console.error("Error creating project:", error);
    return { success: false, error: error.message };
  }
}

export async function updateProject(id: string, updateData: Partial<ProjectItem>) {
  try {
    await connectDB();
    const updated = await Project.findOneAndUpdate(
      { $or: [{ _id: id }, { id: id }, { projectCode: id }] },
      { ...updateData, updatedAt: new Date() },
      { new: true }
    );

    revalidatePath("/dashboard/projects");
    revalidatePath(`/dashboard/projects/${id}`);
    revalidatePath("/dashboard/projects/sprints");
    revalidatePath("/dashboard/projects/devops");
    revalidatePath("/dashboard/projects/design");
    return { success: true, project: updated ? JSON.parse(JSON.stringify(updated)) : null };
  } catch (error: any) {
    console.error("Error updating project:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProject(id: string) {
  try {
    await connectDB();
    await Project.findOneAndDelete({ $or: [{ _id: id }, { id: id }, { projectCode: id }] });

    revalidatePath("/dashboard/projects");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting project:", error);
    return { success: false, error: error.message };
  }
}

// Project Discussion CRUD
export async function addProjectDiscussion(
  projectId: string,
  noteData: Partial<ProjectDiscussionNote>
) {
  try {
    await connectDB();
    const note: ProjectDiscussionNote = {
      id: `disc_${Date.now()}`,
      author: noteData.author || "Developer",
      role: noteData.role || "Engineering",
      text: noteData.text || "",
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updated = await Project.findOneAndUpdate(
      { $or: [{ _id: projectId }, { id: projectId }, { projectCode: projectId }] },
      { $push: { discussions: note }, updatedAt: new Date() },
      { new: true }
    );

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true, note, project: updated ? JSON.parse(JSON.stringify(updated)) : null };
  } catch (error: any) {
    console.error("Error adding project discussion note:", error);
    return { success: false, error: error.message };
  }
}

// GitHub / GitLab Repository CRUD
export async function addProjectRepository(
  projectId: string,
  repoData: Partial<ProjectRepository>
) {
  try {
    await connectDB();
    const repo: ProjectRepository = {
      id: `repo_${Date.now()}`,
      name: repoData.name || "repo-main",
      url: repoData.url || "https://github.com/webxode",
      branch: repoData.branch || "main",
      provider: repoData.provider || "github",
      lastCommitMessage: repoData.lastCommitMessage || "Initial commit",
      openPrCount: repoData.openPrCount || 0,
    };

    const updated = await Project.findOneAndUpdate(
      { $or: [{ _id: projectId }, { id: projectId }, { projectCode: projectId }] },
      { $push: { repositories: repo }, updatedAt: new Date() },
      { new: true }
    );

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true, repo, project: updated ? JSON.parse(JSON.stringify(updated)) : null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProjectRepository(projectId: string, repoId: string) {
  try {
    await connectDB();
    const updated = await Project.findOneAndUpdate(
      { $or: [{ _id: projectId }, { id: projectId }, { projectCode: projectId }] },
      {
        $pull: { repositories: { $or: [{ id: repoId }, { name: repoId }] } },
        updatedAt: new Date(),
      },
      { new: true }
    );

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true, project: updated ? JSON.parse(JSON.stringify(updated)) : null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Cloud Resources (AWS EC2, S3, RDS, etc.) CRUD
export async function addProjectCloudResource(
  projectId: string,
  resourceData: Partial<ProjectCloudResource>
) {
  try {
    await connectDB();
    const resource: ProjectCloudResource = {
      id: `cres_${Date.now()}`,
      provider: resourceData.provider || "AWS",
      type: resourceData.type || "EC2 Compute",
      name: resourceData.name || "aws-instance",
      resourceId: resourceData.resourceId || `i-${Math.random().toString(36).substring(2, 10)}`,
      region: resourceData.region || "us-east-1",
      status: resourceData.status || "Running",
      purpose: resourceData.purpose || "Workload execution",
      costPerMonth: Number(resourceData.costPerMonth) || 0,
      details: resourceData.details || "",
    };

    const updated = await Project.findOneAndUpdate(
      { $or: [{ _id: projectId }, { id: projectId }, { projectCode: projectId }] },
      { $push: { cloudResources: resource }, updatedAt: new Date() },
      { new: true }
    );

    revalidatePath(`/dashboard/projects/${projectId}`);
    revalidatePath("/dashboard/projects/devops");
    return {
      success: true,
      resource,
      project: updated ? JSON.parse(JSON.stringify(updated)) : null,
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProjectCloudResource(projectId: string, resourceId: string) {
  try {
    await connectDB();
    const updated = await Project.findOneAndUpdate(
      { $or: [{ _id: projectId }, { id: projectId }, { projectCode: projectId }] },
      { $pull: { cloudResources: { id: resourceId } }, updatedAt: new Date() },
      { new: true }
    );

    revalidatePath(`/dashboard/projects/${projectId}`);
    revalidatePath("/dashboard/projects/devops");
    return { success: true, project: updated ? JSON.parse(JSON.stringify(updated)) : null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// DevOps Logs & SLA Items CRUD
export async function addProjectDevOpsItem(
  projectId: string,
  itemData: Partial<ProjectDevOpsItem>
) {
  try {
    await connectDB();
    const item: ProjectDevOpsItem = {
      id: `devops_${Date.now()}`,
      title: itemData.title || "DevOps Activity",
      category: itemData.category || "Infrastructure",
      status: itemData.status || "In Progress",
      updatedBy: itemData.updatedBy || "DevOps Engineer",
      date: itemData.date || new Date().toISOString().split("T")[0],
      notes: itemData.notes || "",
    };

    const updated = await Project.findOneAndUpdate(
      { $or: [{ _id: projectId }, { id: projectId }, { projectCode: projectId }] },
      { $push: { devopsLogs: item }, updatedAt: new Date() },
      { new: true }
    );

    revalidatePath(`/dashboard/projects/${projectId}`);
    revalidatePath("/dashboard/projects/devops");
    return { success: true, item, project: updated ? JSON.parse(JSON.stringify(updated)) : null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProjectDevOpsItem(projectId: string, itemId: string) {
  try {
    await connectDB();
    const updated = await Project.findOneAndUpdate(
      { $or: [{ _id: projectId }, { id: projectId }, { projectCode: projectId }] },
      { $pull: { devopsLogs: { id: itemId } }, updatedAt: new Date() },
      { new: true }
    );

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true, project: updated ? JSON.parse(JSON.stringify(updated)) : null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Engineering Roster / Team Member CRUD
export async function addProjectTeamMember(
  projectId: string,
  memberData: Partial<ProjectTeamMember>
) {
  try {
    await connectDB();
    const member: ProjectTeamMember = {
      id: `tm_${Date.now()}`,
      name: memberData.name || "Engineer",
      role: memberData.role || "Frontend Developer",
      email: memberData.email || "dev@webxode.com",
      allocationPercent: Number(memberData.allocationPercent) || 100,
    };

    const updated = await Project.findOneAndUpdate(
      { $or: [{ _id: projectId }, { id: projectId }, { projectCode: projectId }] },
      { $push: { teamMembers: member }, updatedAt: new Date() },
      { new: true }
    );

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true, member, project: updated ? JSON.parse(JSON.stringify(updated)) : null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProjectTeamMember(projectId: string, memberId: string) {
  try {
    await connectDB();
    const updated = await Project.findOneAndUpdate(
      { $or: [{ _id: projectId }, { id: projectId }, { projectCode: projectId }] },
      {
        $pull: { teamMembers: { $or: [{ id: memberId }, { name: memberId }] } },
        updatedAt: new Date(),
      },
      { new: true }
    );

    revalidatePath(`/dashboard/projects/${projectId}`);
    return { success: true, project: updated ? JSON.parse(JSON.stringify(updated)) : null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// Figma Design Specs CRUD
export async function addProjectDesignSpec(
  projectId: string,
  specData: Partial<ProjectDesignSpec>
) {
  try {
    await connectDB();
    const spec: ProjectDesignSpec = {
      id: `ds_${Date.now()}`,
      title: specData.title || "Figma UI Specs",
      figmaUrl: specData.figmaUrl || "https://www.figma.com",
      prototypeUrl: specData.prototypeUrl || "",
      screenCount: Number(specData.screenCount) || 10,
      designerName: specData.designerName || "Product Designer",
      status: specData.status || "Wireframes",
      updatedAt: new Date().toISOString().split("T")[0],
      notes: specData.notes || "",
    };

    const updated = await Project.findOneAndUpdate(
      { $or: [{ _id: projectId }, { id: projectId }, { projectCode: projectId }] },
      { $push: { designSpecs: spec }, updatedAt: new Date() },
      { new: true }
    );

    revalidatePath(`/dashboard/projects/${projectId}`);
    revalidatePath("/dashboard/projects/design");
    return { success: true, spec, project: updated ? JSON.parse(JSON.stringify(updated)) : null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteProjectDesignSpec(projectId: string, specId: string) {
  try {
    await connectDB();
    const updated = await Project.findOneAndUpdate(
      { $or: [{ _id: projectId }, { id: projectId }, { projectCode: projectId }] },
      { $pull: { designSpecs: { id: specId } }, updatedAt: new Date() },
      { new: true }
    );

    revalidatePath(`/dashboard/projects/${projectId}`);
    revalidatePath("/dashboard/projects/design");
    return { success: true, project: updated ? JSON.parse(JSON.stringify(updated)) : null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getSprints(projectId?: string): Promise<SprintItem[]> {
  if (projectId) {
    return DEMO_SPRINTS.filter((s) => s.projectId === projectId || s.projectCode === projectId);
  }
  return DEMO_SPRINTS;
}

export async function getDevOpsPipelines(projectId?: string): Promise<DevOpsPipelineRun[]> {
  if (projectId) {
    return DEMO_PIPELINE_RUNS.filter(
      (p) => p.projectId === projectId || p.projectCode === projectId
    );
  }
  return DEMO_PIPELINE_RUNS;
}
