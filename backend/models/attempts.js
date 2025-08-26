import mongoose from "mongoose";

const AttemptSchema = new mongoose.Schema(
  {
    attemptId: {
      type: String,
      required: true,
    },
    assessmentType: { type: String },
    assessmentId: {
      type: String,
      required: true,
    },
    groupAllow: {type: Boolean},
    group: { type: String },
    studentId: {
      type: String,
      required: true,
    },
    grade: String,
    startedAt: Date,
    submittedAt: Date,
    timeSpentSec: Number,
    questionOrder: [String],
    responses: [
      {
        questionId: { type: String },
        selectedAnswer: String,
        correctAnswer: String,
      },
    ],
    score: Number,
    maxScore: Number,
  },
  { timestamps: true }
).index({ studentId: 1, assessmentId: 1 }, { unique: true });

const Attempt = mongoose.model("Attempt", AttemptSchema);

export default Attempt;
