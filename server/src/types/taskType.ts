import { ObjectId } from "mongoose";

// type do jednego taska, w razie potrzebny można zmienić
export type TaskType = {
    _id?: ObjectId,
    title: string,
    body: string,
    createdAt?: Date,
    priority: string,
    isDone?: boolean,
}

export enum TaskPriority {
    Normal,
    Important,
    MostImportant
}