import express from "express";
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();
const port = 5000;


const CONNECTION_URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@todo-app.pylyo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


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
