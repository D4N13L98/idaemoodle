import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
  },
  { versionKey: false}
);

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
