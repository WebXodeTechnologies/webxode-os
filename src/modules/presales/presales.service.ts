import { presalesRepository } from "./presales.repository";
import { PresalesItem } from "./presales.types";

export class PresalesService {
  calculateEstimationTotal(modules: { hours: number; ratePerHour: number }[]) {
    const totalHours = modules.reduce((sum, mod) => sum + (Number(mod.hours) || 0), 0);
    const subtotal = modules.reduce(
      (sum, mod) => sum + (Number(mod.hours) || 0) * (Number(mod.ratePerHour) || 0),
      0
    );
    const gst = Math.round(subtotal * 0.18);
    const totalWithGst = subtotal + gst;

    return {
      totalHours,
      subtotal,
      gst,
      totalWithGst,
    };
  }

  calculateMargin(price: number, internalCost: number) {
    if (!price || price <= 0) return 0;
    return Math.round(((price - internalCost) / price) * 100);
  }

  async getPresalesById(id: string): Promise<PresalesItem | null> {
    const item = await presalesRepository.findById(id);
    if (!item) return null;
    return JSON.parse(JSON.stringify(item));
  }
}

export const presalesService = new PresalesService();
