import mongoose, { Schema, Document } from "mongoose";

export interface IFollowUp extends Document {
  jid: string;
  pushName: string;
  eventType: "package_interest" | "booking_started";
  status: "pending" | "sent" | "completed" | "cancelled";
  scheduledAt: Date;
  sentAt?: Date;
  respondedAt?: Date;
  createdAt: Date;
}

const followUpSchema = new Schema<IFollowUp>({
  jid: {
    type: String,
    required: true,
  },
  pushName: {
    type: String,
    default: "",
  },
  eventType: {
    type: String,
    enum: ["package_interest", "booking_started"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "sent", "completed", "cancelled"],
    default: "pending",
  },
  scheduledAt: {
    type: Date,
    required: true,
  },
  sentAt: {
    type: Date,
  },
  respondedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

followUpSchema.index({ jid: 1, eventType: 1, status: 1 });
followUpSchema.index({ status: 1, scheduledAt: 1 });

export default mongoose.models.FollowUp ||
  mongoose.model<IFollowUp>("FollowUp", followUpSchema);
