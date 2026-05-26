import mongoose, { Schema, Document } from "mongoose";

export interface IGallery extends Document {
  id: string;
  src: string;
  alt: string;
  category: string;
  isActive: boolean;
  createdAt: Date;
}

const gallerySchema = new Schema<IGallery>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Gallery ||
  mongoose.model<IGallery>("Gallery", gallerySchema);
