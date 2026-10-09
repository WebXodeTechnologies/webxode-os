import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILead extends Document {
  companyName: string;
  contactPerson: string;
  email?: string;
  phone: string;
  source: string;
  hasGst: boolean;
  gstin?: string;
  estimatedValue: number;
  stage: "Enquiry" | "Qualified" | "Unqualified" | "Proposal" | "Won" | "Lost" | "Dead";
  lossReason?: string;
  salesOwner: mongoose.Types.ObjectId; // References users
  tasks: {
    _id?: mongoose.Types.ObjectId;
    title: string;
    completed: boolean;
    dueDate: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    companyName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    source: { type: String, required: true },
    hasGst: { type: Boolean, default: false },
    gstin: { type: String },
    estimatedValue: { type: Number, default: 0 },
    stage: {
      type: String,
      enum: ["Enquiry", "Qualified", "Unqualified", "Proposal", "Won", "Lost", "Dead"],
      default: "Enquiry",
      required: true,
    },
    lossReason: { type: String },
    salesOwner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tasks: [
      {
        title: { type: String, required: true },
        completed: { type: Boolean, default: false },
        dueDate: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Lead: Model<ILead> = mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);
export default Lead;
