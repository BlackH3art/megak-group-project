import {TaskType} from "./taskType";
// typ dla user
export type UserType = {
    email:string,
    userName:string,
    password:string,
    tasks:TaskType[]
}