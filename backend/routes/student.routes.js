import express from "express";
import { getStudent, getStudents } from "../controllers/students.controller.js";

const studentRouter = express.Router();

studentRouter.get("/searchStudent/:id", getStudent);
studentRouter.get("/searchStudents", getStudents);

export default studentRouter;
