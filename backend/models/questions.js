import mongoose from "mongoose";

const questionsSchema = new mongoose.Schema(
  {
    code: String,
    topic: String,
    image: { type: String, alt: String },
    options: [String],
    answer: Number,
  },
  { timestamps: true }
);

const Questions = mongoose.model("Questions", questionsSchema);

export default Questions;
