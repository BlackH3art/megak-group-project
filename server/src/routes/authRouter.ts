import express from 'express';
import { signInUser, signUpUser } from 'src/controllers/authControllers';

const authRouter = express.Router();

authRouter.post('/signIn', signInUser);
authRouter.post('/signUp', signUpUser);

export default authRouter;