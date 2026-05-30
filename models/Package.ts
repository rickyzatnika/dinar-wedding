import mongoose, { Schema, Document } from "mongoose";

export interface IPackageCategory {
  name: string;
  items: string[];
}

export interface IPackage extends Document {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  categories?: IPackageCategory[];
  isPopular?: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const packageSchema = new Schema<IPackage>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  categories: [{
    name: { type: String, required: true },
    items: { type: [String], required: true },
  }],
  isPopular: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
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

export default mongoose.models.Package ||
  mongoose.model<IPackage>("Package", packageSchema);
