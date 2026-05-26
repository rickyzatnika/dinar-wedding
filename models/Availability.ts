import mongoose, { Schema, Document } from "mongoose";

export interface IAvailability extends Document {
  date: Date;
  isAvailable: boolean;
  notes: string;
  maxBookings: number;
  currentBookings: number;
  createdAt: Date;
  updatedAt: Date;
}

const availabilitySchema = new Schema<IAvailability>({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  notes: {
    type: String,
    default: "",
  },
  maxBookings: {
    type: Number,
    default: 1,
  },
  currentBookings: {
    type: Number,
    default: 0,
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

availabilitySchema.index({ date: 1 });
availabilitySchema.index({ isAvailable: 1 });

export default mongoose.models.Availability ||
  mongoose.model<IAvailability>("Availability", availabilitySchema);
