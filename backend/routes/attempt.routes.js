import express from "express";
import {
    createAttempt, getAttempts
} from "../controllers/attempt.controller.js"

const attemptRouter = express.Router();

attemptRouter.post("/createAttempt", createAttempt);
attemptRouter.get("/searchAttempts", getAttempts);

export default attemptRouter;
