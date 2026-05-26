import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  id: string;
  name: string;
  role: string;
  avatar: string;
  message: string;
  rating: number;
  isActive: boolean;
  createdAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
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

export default mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>("Testimonial", testimonialSchema);
