import Presales, { IPresalesDocument } from "@/models/presales.model";
import { connectDB } from "@/lib/db";

export class PresalesRepository {
  async findAll(filter: any = {}): Promise<IPresalesDocument[]> {
    await connectDB();
    return Presales.find(filter).sort({ updatedAt: -1 });
  }

  async findById(id: string): Promise<IPresalesDocument | null> {
    await connectDB();
    return Presales.findById(id);
  }

  async create(data: any): Promise<IPresalesDocument> {
    await connectDB();
    return Presales.create(data);
  }

  async update(id: string, updateData: any): Promise<IPresalesDocument | null> {
    await connectDB();
    return Presales.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    await connectDB();
    const result = await Presales.findByIdAndDelete(id);
    return !!result;
  }
}

export const presalesRepository = new PresalesRepository();
