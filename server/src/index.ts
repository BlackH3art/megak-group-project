import express from "express";
import mongoose from 'mongoose';
import 'dotenv/config';
import {handleError} from "../utils/errors";

// routes
import authRouter from "./routes/authRouter";
import apiRouter from "./routes/apiRouter";

const app = express();
const port = 5000;
const CONNECTION_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@todo-app.pylyo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

app.use(express.json())
// routes

app.use('/', authRouter);
app.use('/api', apiRouter);

app.use(handleError);

mongoose.connect(CONNECTION_URL)
    .then(() => {

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });

    }).catch((err) => {
        console.error(err);
    });
