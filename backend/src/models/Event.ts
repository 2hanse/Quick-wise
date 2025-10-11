import mongoose, { Schema, Document, Types } from "mongoose";

interface AICardSource {
  videoId: string;
  videoTitle: string;
  speaker: string;
  videoUrl: string;
}

interface AICard {
  type: "tip" | "scenario" | "checklist";
  content?: string;
  situation?: string;
  response?: string;
  items?: string[];
  source: AICardSource;
  order: number;
}

interface AIContent {
  status: "pending" | "processing" | "completed" | "failed";
  cards: AICard[];
  keywords: string[];
  usedVideoIds: string[];
  processedAt?: Date;
  error?: string;
}

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
  aiContent?: AIContent;
  lastSyncedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AICardSourceSchema = new Schema(
  {
    videoId: { type: String, required: true },
    videoTitle: { type: String, required: true },
    speaker: { type: String, required: true },
    videoUrl: { type: String, required: true },
  },
  { _id: false }
);

const AICardSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["tip", "scenario", "checklist"],
      required: true,
    },
    content: { type: String },
    situation: { type: String },
    response: { type: String },
    items: [{ type: String }],
    source: { type: AICardSourceSchema, required: true },
    order: { type: Number, required: true },
  },
  { _id: false }
);

const AIContentSchema = new Schema(
  {
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    cards: [AICardSchema],
    keywords: [{ type: String }],
    usedVideoIds: [{ type: String }],
    processedAt: { type: Date },
    error: { type: String },
  },
  { _id: false }
);

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
    aiContent: AIContentSchema,
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

export { Event, IEvent, AIContent, AICard, AICardSource };
