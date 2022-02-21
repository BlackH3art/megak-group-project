import {userAuthMiddleware} from '../utils/userAuth'
import express from "express";
import mongoose from 'mongoose';
import 'dotenv/config';
import {handleError} from "../utils/errors";

// routes
import authRouter from "./routes/authRouter";
import taskRouter from "./routes/taskRouter";
import {userRouter} from "./routes/userRouter";

const app = express();
const port = 5000;
const CONNECTION_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@todo-app.pylyo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

app.use(express.json())
// routes

app.use('/api', authRouter);
app.use('/api/user', userAuthMiddleware, userRouter)
app.use('/api',userAuthMiddleware, taskRouter);
app.use(handleError);

mongoose.connect(CONNECTION_URL)
    .then(() => {

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });

    }).catch((err) => {
        console.error(err);
    });
