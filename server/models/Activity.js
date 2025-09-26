import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  dueAt: Date,
  reminderAt: Date,
  status: { type: String, default: "Pending" },
  priority: { type: String, default: "Medium" },
  category: { type: String, default: "Personal" },
});

export const Activity = mongoose.model("Activity", activitySchema);
