import express from 'express';
import {addTask, updateTask, deleteTask, getAllTasks, getOneTask} from '../controllers/userControllers';

const apiRouter = express.Router();

apiRouter.get('/api', getAllTasks);
apiRouter.get('/api/:taskId', getOneTask);
apiRouter.post('/api/:taskId', addTask);
apiRouter.patch('/api/:taskId', updateTask);
apiRouter.delete('/api/:taskId', deleteTask);

// apiRouter.get('/api/user', getUser)
// apiRouter.post('/api/user/:id', editUser)
// apiRouter.delete('/api/user/:id', deleteUser)
// apiRouter.post('/api/user', logOut)

export default apiRouter;