import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILeadActivity extends Document {
  leadId: mongoose.Types.ObjectId; // References Lead
  authorId: mongoose.Types.ObjectId; // References User
  type: "Call" | "Mail" | "Meeting" | "Note";
  content: string;
  durationSeconds?: number;
  createdAt: Date;
  updatedAt: Date;
}

const LeadActivitySchema = new Schema<ILeadActivity>(
  {
    leadId: { type: Schema.Types.ObjectId, ref: "Lead", required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["Call", "Mail", "Meeting", "Note"], required: true },
    content: { type: String, required: true },
    durationSeconds: { type: Number },
  },
  { timestamps: true }
);

export const LeadActivity: Model<ILeadActivity> =
  mongoose.models.LeadActivity || mongoose.model<ILeadActivity>("LeadActivity", LeadActivitySchema);
export default LeadActivity;
