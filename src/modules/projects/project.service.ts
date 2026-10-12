import { ProjectRepository } from "./project.repository";
import { ProjectItem } from "./project.types";

export class ProjectService {
  static async getAllProjects(filter: any = {}): Promise<ProjectItem[]> {
    const docs = await ProjectRepository.findAll(filter);
    return JSON.parse(JSON.stringify(docs));
  }

  static async getProject(id: string): Promise<ProjectItem | null> {
    const doc = await ProjectRepository.findById(id);
    return doc ? JSON.parse(JSON.stringify(doc)) : null;
  }

  static async createProject(data: Partial<ProjectItem>): Promise<ProjectItem> {
    const created = await ProjectRepository.create(data);
    return JSON.parse(JSON.stringify(created));
  }

  static async updateProject(id: string, data: Partial<ProjectItem>): Promise<ProjectItem | null> {
    const updated = await ProjectRepository.update(id, data);
    return updated ? JSON.parse(JSON.stringify(updated)) : null;
  }

  static async deleteProject(id: string): Promise<boolean> {
    return ProjectRepository.delete(id);
  }
}
