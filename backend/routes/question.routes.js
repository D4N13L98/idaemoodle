import express from "express";
import {
    getQuestions
} from "../controllers/question.controller.js";

const questionRouter = express.Router();

questionRouter.get("/searchQuestions/:topic", getQuestions);


export default questionRouter;