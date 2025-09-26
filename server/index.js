import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Error:", err));

// Activity Schema
const activitySchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: "Pending" },
  dueAt: Date,
  reminderAt: Date
});

const Activity = mongoose.model("Activity", activitySchema);

// Routes
app.get("/activities", async (req, res) => {
  const activities = await Activity.find();
  res.json(activities);
});

app.post("/activities", async (req, res) => {
  const activity = new Activity(req.body);
  await activity.save();
  res.json(activity);
});

app.patch("/activities/:id", async (req, res) => {
  const updated = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete("/activities/:id", async (req, res) => {
  await Activity.findByIdAndDelete(req.params.id);
  res.json({ message: "Activity deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
