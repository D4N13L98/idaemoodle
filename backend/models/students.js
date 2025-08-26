import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    grade: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
