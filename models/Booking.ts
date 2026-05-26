import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  nama: string;
  phone: string;
  alamat: string;
  tanggal: Date;
  waktu: string;
  paket: string;
  pesan?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>({
  nama: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    default: "",
  },
  tanggal: {
    type: Date,
    required: true,
  },
  waktu: {
    type: String,
    default: "",
  },
  paket: {
    type: String,
    required: true,
  },
  pesan: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending",
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

bookingSchema.index({ phone: 1 });
bookingSchema.index({ tanggal: 1 });
bookingSchema.index({ status: 1 });

export default mongoose.models.Booking ||
  mongoose.model<IBooking>("Booking", bookingSchema);
