import {TaskType} from "./taskType";
import {Schema} from "mongoose";
// typ dla user
export type UserType = {
    _id?: Schema.Types.ObjectId,
    email:string,
    userName:string,
    password:string,
    tasks?:TaskType[],
}