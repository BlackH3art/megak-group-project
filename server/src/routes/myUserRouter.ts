import express from 'express';
import { addTask, updateTask, deleteTask, deleteUser, getUserTasks } from '../controllers/myUserController'

const myUserRouter = express.Router();

myUserRouter.get('/:userId', getUserTasks);
myUserRouter.post('/:userId/task', addTask);
myUserRouter.patch('/:userId/:taskId', updateTask);
myUserRouter.delete('/:userId/:task', deleteTask);

myUserRouter.delete('/:userId', deleteUser);



export default myUserRouter;