import express from "express";
import {
    getAssessment,
    getAssessments,
    createAssessment,
    updateAssessment,
    deleteAssessment
} from "../controllers/assessments.controller.js"

const assessmentRouter = express.Router();


assessmentRouter.get("/searchAssessment/:code", getAssessment);
assessmentRouter.get("/searchAssessments", getAssessments);
assessmentRouter.post("/createAssessment", createAssessment);
assessmentRouter.put("/updateAssessment/:code", updateAssessment);
assessmentRouter.delete("/deleteAssessment/:code", deleteAssessment);

export default assessmentRouter;
