import mongoose, { Schema, Document, Types } from "mongoose";

interface IEvent extends Document {
  userId: Types.ObjectId;
  googleEventId: string;
  title: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  description?: string;
  isAllDay: boolean;
  status: "confirmed" | "tentative" | "cancelled";
  category?: string;
  lastSyncedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    googleEventId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
      index: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    isAllDay: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["confirmed", "tentative", "cancelled"],
      default: "confirmed",
    },
    category: {
      type: String,
    },
    lastSyncedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

EventSchema.index({ userId: 1, googleEventId: 1 }, { unique: true });
EventSchema.index({ userId: 1, startTime: 1, endTime: 1 });

const Event = mongoose.model<IEvent>("Event", EventSchema);

export { Event, IEvent };
