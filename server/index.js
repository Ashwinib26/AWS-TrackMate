// server/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Activity Schema & Model
const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" },
  dueAt: Date,
  reminderAt: Date,
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  category: { type: String, default: "Personal" }
}, { timestamps: true });

const Activity = mongoose.model("Activity", activitySchema, "activities");

// Routes

// Get all activities
app.get("/activities", async (req, res) => {
  try {
    const activities = await Activity.find().sort({ dueAt: 1 });
    res.status(200).json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch activities" });
  }
});

// Add a new activity
app.post("/Activities", async (req, res) => {
  try {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json(activity);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to add activity" });
  }
});

// Update activity (e.g., mark complete)
app.patch("/activities/:id", async (req, res) => {
  try {
    const updated = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Activity not found" });
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to update activity" });
  }
});

// Delete activity
app.delete("/activities/:id", async (req, res) => {
  try {
    const deleted = await Activity.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Activity not found" });
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete activity" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
