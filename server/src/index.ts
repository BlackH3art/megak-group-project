import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';

// utils
import {userAuthMiddleware} from '../utils/userAuth'
import {handleError} from "../utils/errors";

// routes
import myAuthRouter from './routes/myAuthRouter';
import myUserRouter from './routes/myUserRouter';

const app = express();
const port = 5000;
const CONNECTION_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@todo-app.pylyo.mongodb.net/ToDoApp?retryWrites=true&w=majority`;


app.use(express.json())
// routes


app.use(cors());

app.use('/auth', myAuthRouter);
app.use('/user', myUserRouter);

app.use(handleError);




mongoose.connect(CONNECTION_URL)
    .then(() => {

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });

    }).catch((err) => {
        console.error(err);
    });
