import express from "express";
import {deleteUser, showProfile} from "../controllers/userControllers";

export const userRouter = express.Router();

// @ts-ignore
userRouter.get('/user', showProfile )
//@ts-ignore
userRouter.delete('/user', deleteUser)
// taskRouter.post('/user/:id', editUser)
// taskRouter.post('/user', logOut)