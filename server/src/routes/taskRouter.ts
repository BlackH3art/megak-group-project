import express from 'express';
import {addTask, updateTask, deleteTask, getAllTasks, getOneTask} from '../controllers/taskControllers';

const taskRouter = express.Router();

taskRouter.get('/', getAllTasks);
taskRouter.get('/:taskId', getOneTask);
taskRouter.post('/:taskId', addTask);
taskRouter.patch('/:taskId', updateTask);
taskRouter.delete('/:taskId', deleteTask);

// taskRouter.get('/user', getUser)
// taskRouter.post('/user/:id', editUser)
// taskRouter.delete('/user/:id', deleteUser)
// taskRouter.post('/user', logOut)

export default taskRouter;
