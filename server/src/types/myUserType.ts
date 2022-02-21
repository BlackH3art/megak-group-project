import {TaskType} from "./taskType";
import {Schema} from "mongoose";


export type MyUserType = {
    _id?: Schema.Types.ObjectId,
    email:string,
    password:string,
    tasks?:TaskType[],
}