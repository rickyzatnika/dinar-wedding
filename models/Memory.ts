import mongoose, { Schema, Document } from "mongoose";

export interface IMemory extends Document {
  phoneNumber: string;
  key: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
}

const memorySchema = new Schema<IMemory>({
  phoneNumber: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
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

memorySchema.index({ phoneNumber: 1, key: 1 }, { unique: true });

export default mongoose.models.Memory ||
  mongoose.model<IMemory>("Memory", memorySchema);
