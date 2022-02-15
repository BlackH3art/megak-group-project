import express from "express";
import mongoose from 'mongoose';
import 'dotenv/config';

// routes
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";

const app = express();
const port = 5000;
const CONNECTION_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@todo-app.pylyo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


// routes
app.use('/auth', authRouter);
app.use('/user', userRouter);


app.get("/", (req, res) => {
    res.send( "Hello world!" );
});


mongoose.connect(CONNECTION_URL)
    .then(() => {

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });

    }).catch((err) => {
        console.error(err);
    });
