import mongoose, { Schema, Document } from "mongoose";

interface IMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export interface IConversation extends Document {
  phoneNumber: string;
  messages: IMessage[];
  title: string;
  status: "active" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
  role: {
    type: String,
    enum: ["user", "assistant", "system"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const conversationSchema = new Schema<IConversation>({
  phoneNumber: {
    type: String,
    required: true,
  },
  messages: [messageSchema],
  title: {
    type: String,
    default: "New Conversation",
  },
  status: {
    type: String,
    enum: ["active", "archived"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

conversationSchema.index({ phoneNumber: 1, updatedAt: -1 });

export default mongoose.models.Conversation ||
  mongoose.model<IConversation>("Conversation", conversationSchema);
