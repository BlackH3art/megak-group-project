import express from "express";
import {showProfile} from "../controllers/userControllers";

export const userRouter = express.Router();

// @ts-ignore
userRouter.get('/user/profile', showProfile )