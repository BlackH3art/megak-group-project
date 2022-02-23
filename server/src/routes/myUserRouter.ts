import express from 'express';
import { addTask, updateTask, deleteTask, deleteUser, getUserTasks } from '../controllers/myUserController'

const myUserRouter = express.Router();

myUserRouter.get('/:userId/task', getUserTasks);
myUserRouter.post('/:userId/task', addTask);
myUserRouter.patch('/:userId/:taskId', updateTask);
myUserRouter.delete('/:userId/:taskId', deleteTask);

myUserRouter.delete('/:userId', deleteUser);



export default myUserRouter;