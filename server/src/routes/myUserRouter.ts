import express from 'express';
import { deleteUser, addTask, updateTask, deleteTask } from '../controllers/myUserController'

const myUserRouter = express.Router();

myUserRouter.post('/:userId/task', addTask);
myUserRouter.patch('/:userId/task', updateTask);
myUserRouter.delete('/:userId/task', deleteTask);

myUserRouter.delete('/', deleteUser);


export default myUserRouter;