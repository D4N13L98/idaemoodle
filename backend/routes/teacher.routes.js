import express from "express";
import { getTeacherById } from "../controllers/teacher.controller.js"

const teacherRouter = express.Router();

teacherRouter.get("/searchTeacher/:code", getTeacherById);

export default teacherRouter;
