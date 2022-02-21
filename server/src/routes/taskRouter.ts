import express from 'express';
import {addTask, updateTask, deleteTask, getAllTasks, getOneTask} from '../controllers/taskControllers';

const taskRouter = express.Router();

taskRouter.get('/', getAllTasks);
taskRouter.post('/', addTask);
taskRouter.get('/:taskId', getOneTask);
taskRouter.patch('/:taskId', updateTask);
taskRouter.delete('/:taskId', deleteTask);





export default taskRouter;
