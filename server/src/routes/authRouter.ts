import express from 'express';
import { signInUser, signUpUser, showMainPage} from '../controllers/authControllers';

const authRouter = express.Router();
authRouter.get('/', showMainPage)
authRouter.post('/signIn', signInUser);
authRouter.post('/signUp', signUpUser);


export default authRouter;