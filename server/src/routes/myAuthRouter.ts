import express from 'express';
import { signIn, signUp } from '../controllers/myAuthControllers';

const myAuthRouter = express.Router();

myAuthRouter.post('/sign-in', signIn);
myAuthRouter.post('/sign-up', signUp);

export default myAuthRouter;