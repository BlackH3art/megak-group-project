import express from 'express';
import { signInUser, signUpUser } from 'src/controllers/authControllers';

const authRouter = express.Router();

authRouter.post('/signin', signInUser);
authRouter.post('/signup', signUpUser);

export default authRouter;