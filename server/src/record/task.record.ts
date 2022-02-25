import {ObjectId} from "mongoose";
import { Task } from "../models/task";
import { User } from "../models/user";
import { TaskType } from "../types/taskType";
import { ValidationError } from "../../utils/errors";
import {Users} from "../models/MyUserModel";
import {MyTaskType} from "../types/myTaskType";


export class TaskRecord {
    // Dodawanie tasków:
    public static async addTask(newTask: TaskType): Promise<ObjectId> {
        const createdTask: TaskType = await Task.create(newTask);
        return createdTask._id;
    }

    // Usuwanie tasków:
    public static async deleteTask(id: string): Promise<TaskType> {
      return await Task.findByIdAndDelete(id);
    }

    // Edytowanie tasków:
    public static async editTask(id: string, task: TaskType): Promise<void> {
        const { body, priority, title, } = task;
        await Task.updateOne({ _id: id }, { $set: { body, priority, title } });
    }

    // Pobieranie jednego taska:
    public static async getOne(id: ObjectId): Promise<TaskType | null> {
        return Task.findById(id);
    }

    // Pobieranie wszystkich tasków:
    public static async getAll(): Promise<TaskType[]> {
        return Task.find();
    }

    public static async getAllUserTasks(id: any): Promise<MyTaskType[]> {
        const user = await Users.findById(id)
        return user.tasks;
    }
}

// Wypadało by dorobić jakąś walidację i obsługę błędu, nie wiem jak chcemy do tego podejsć, więc narazie to zostawiam.

// Zrobiłem wszystkie metody statyczne, nie wiem czy to dobre rozwiązanie czy nie, chętnie to przegadam na dsc. Jak macie jakieś propozycje to piszcie.