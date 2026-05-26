import mongoose, { Schema, Document } from "mongoose";

interface IMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface IChatHistory extends Document {
  phoneNumber: string;
  messages: IMessage[];
  profile: {
    name?: string;
    favoriteTeam?: string;
    language: string;
  };
  memorySummary: string;
  importantFacts: string[];
  lastMessageAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
  role: {
    type: String,
    enum: ["user", "assistant"],
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

const chatHistorySchema = new Schema<IChatHistory>({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  messages: [messageSchema],
  profile: {
    name: String,
    favoriteTeam: String,
    language: {
      type: String,
      default: "id",
    },
  },
  memorySummary: {
    type: String,
    default: "",
  },
  importantFacts: {
    type: [String],
    default: [],
  },
  lastMessageAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

chatHistorySchema.methods.addMessage = async function (
  role: "user" | "assistant",
  content: string
) {
  this.messages.push({ role, content });

  if (this.messages.length > 20) {
    this.messages = this.messages.slice(-20);
  }

  this.updatedAt = Date.now();
  this.lastMessageAt = Date.now();

  await this.save();
};

export default mongoose.models.ChatHistory ||
  mongoose.model<IChatHistory>("ChatHistory", chatHistorySchema);
