import {Schema, Document, Types } from "mongoose";
import { MyTaskType } from "./myTaskType";


export interface MyUserInterface extends Document {
    _id?: Schema.Types.ObjectId,
    email:string,
    password:string,
    tasks?: Types.DocumentArray<MyTaskType & Document>
}