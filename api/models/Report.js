import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true, trim: true },
    category: { type: String,enum: ["alert", "logistics","intelligence"], required: true, trim: true },
    urgency: {type: String,enum: ["low", "medium","high"],required: true,},
    message: { type: String, required: true, minLength: 6 },
    imagePath: { type: String, required: true, trim: true },
    sourceType: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);
export default mongoose.model('Report', reportSchema);