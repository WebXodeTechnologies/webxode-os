import { connectDB } from "@/lib/db";
import Project, { IProjectDocument } from "@/models/project.model";
import { ProjectItem } from "./project.types";

export class ProjectRepository {
  static async findAll(filter: any = {}): Promise<IProjectDocument[]> {
    await connectDB();
    return Project.find(filter).sort({ updatedAt: -1 }).lean();
  }

  static async findById(id: string): Promise<IProjectDocument | null> {
    await connectDB();
    return Project.findOne({
      $or: [{ _id: id }, { id: id }, { projectCode: id }],
    }).lean();
  }

  static async create(projectData: Partial<ProjectItem>): Promise<IProjectDocument> {
    await connectDB();
    return Project.create(projectData);
  }

  static async update(
    id: string,
    updateData: Partial<ProjectItem>
  ): Promise<IProjectDocument | null> {
    await connectDB();
    return Project.findOneAndUpdate(
      { $or: [{ _id: id }, { id: id }, { projectCode: id }] },
      { ...updateData, updatedAt: new Date() },
      { new: true }
    );
  }

  static async delete(id: string): Promise<boolean> {
    await connectDB();
    const result = await Project.findOneAndDelete({
      $or: [{ _id: id }, { id: id }, { projectCode: id }],
    });
    return !!result;
  }
}
