import express from 'express';
import { addTask, updateTask, deleteTask } from 'src/controllers/userControllers';

const userRouter = express.Router();

userRouter.post('/:userId', addTask);
userRouter.patch('/:userId/:taskId', updateTask);
userRouter.delete('/:userId/:taskId', deleteTask);

export default userRouter;