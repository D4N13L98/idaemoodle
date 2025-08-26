import express from "express";
import cors from "cors";
import studentRouter from "../routes/student.routes.js";
import questionRouter from "../routes/question.routes.js"
import router from "../routes/auth.routes.js";
import assessmentRouter from "../routes/assessment.routes.js";
import teacherRouter from "../routes/teacher.routes.js";
import attemptRouter from "../routes/attempt.routes.js"

const app = express();

app.use(express.json());
app.use(cors());
app.use("/idaemoodle/auth", router);

app.use(express.urlencoded({ extended: false }));
app.use("/idaemoodle/students", studentRouter);
app.use("/idaemoodle/questions", questionRouter);
app.use("/idaemoodle/assessments", assessmentRouter);
app.use("/idaemoodle/teachers", teacherRouter);
app.use("/idaemoodle/attempts", attemptRouter);

export default app;