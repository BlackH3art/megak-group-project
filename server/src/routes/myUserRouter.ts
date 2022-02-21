import express from 'express';
import { deleteUser, addTask, updateTask, deleteTask } from '../controllers/myUserController'

const myUserRouter = express.Router();

myUserRouter.post('/task',addTask );
myUserRouter.patch('/task', updateTask);
myUserRouter.delete('/task', deleteTask);

myUserRouter.delete('/', deleteUser);


export default myUserRouter;