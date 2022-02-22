import { ObjectId } from "mongoose";

// type do jednego taska, w razie potrzebny można zmienić
export type MyTaskType = {
    _id?: ObjectId,
    task: string,
    createdAt?: Date,
    isDone?: boolean,
}
