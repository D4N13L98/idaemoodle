import mongoose from "mongoose";

const assessmentsSchema = new mongoose.Schema(
  {
    code: { type: String },
    name: { type: String },
    assessment: { type: String },
    topic: { type: String },
    subject: { type: String },
    grade: { type: String },
    teacherId: { type: Number },
    instructions: { type: String },
    questionsQuantity: { type: Number },
    startsAt: { type: Date },
    endsAt: { type: Date },
    durationMinutes: { type: Number },
    attemptLimit: { type: Number, default: 1 },
    targetAudience: {
      type: [String],
      default: [],
    },
    groupAllow: {
      type: Boolean,
      default: [],
    },
    groups: { type: String, default: 0 },
  },
  { timestamps: true }
);

const Assessments = mongoose.model("Assessments", assessmentsSchema);

export default Assessments;
