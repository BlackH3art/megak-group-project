import express from 'express';
import {addTask, updateTask, deleteTask, getAllTasks, getOneTask} from '../controllers/userControllers';

const taskRouter = express.Router();

taskRouter.get('/', getAllTasks);
taskRouter.get('/:taskId', getOneTask);
taskRouter.post('/:taskId', addTask);
taskRouter.patch('/:taskId', updateTask);
taskRouter.delete('/api/:taskId', deleteTask);

// taskRouter.get('/api/user', getUser)
// taskRouter.post('/api/user/:id', editUser)
// taskRouter.delete('/api/user/:id', deleteUser)
// taskRouter.post('/api/user', logOut)

export default taskRouter;