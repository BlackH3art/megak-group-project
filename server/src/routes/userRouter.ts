import express from 'express';
import {addTask, updateTask, deleteTask, getAllTasks, getOneTask} from 'src/controllers/userControllers';
import {showMainPage} from "../controllers/mainControllers";

const userRouter = express.Router();

userRouter.get('/', showMainPage);
userRouter.get('/api', getAllTasks);
userRouter.get('/api/:taskId', getOneTask);
userRouter.post('/api/:taskId', addTask);
userRouter.patch('/api/:taskId', updateTask);
userRouter.delete('/api/:taskId', deleteTask);

// userRouter.get('/api/user', getUser)
// userRouter.post('/api/user/:id', editUser)
// userRouter.delete('/api/user/:id', deleteUser)
// userRouter.post('/api/user', logOut)

export default userRouter;