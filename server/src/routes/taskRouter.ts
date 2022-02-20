import express from 'express';
import {addTask, updateTask, deleteTask, getAllTasks, getOneTask} from '../controllers/taskControllers';
import {showProfile} from "../controllers/userControllers";

const taskRouter = express.Router();

taskRouter.get('/', getAllTasks);
taskRouter.post('/', addTask);
taskRouter.get('/:taskId', getOneTask);
taskRouter.patch('/:taskId', updateTask);
taskRouter.delete('/:taskId', deleteTask);

// @ts-ignore
taskRouter.get('/user/profile', showProfile )

// taskRouter.post('/user/:id', editUser)
// taskRouter.delete('/user/:id', deleteUser)
// taskRouter.post('/user', logOut)

export default taskRouter;
