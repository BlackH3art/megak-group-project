import express from "express";
import {deleteUser, showProfile} from "../controllers/userControllers";

export const userRouter = express.Router();

userRouter.get('/', showProfile )
userRouter.delete('/', deleteUser)
// taskRouter.post('/user/:id', editUser)
