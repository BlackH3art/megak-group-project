import { ObjectId } from "mongoose";
import { Task } from "../models/task";
import { TaskType } from "../types/taskType";

export class TaskRecord {
    // Dodawanie tasków:
    public static async addTask(newTask: TaskType): Promise<ObjectId> {
        const createdTask: TaskType = await Task.create(newTask);
        return createdTask._id;
    }

    // Usuwanie tasków:
    public static async deleteTask(id: ObjectId): Promise<void> {
        await Task.deleteOne({ _id: id });
    }

    // Edytowanie tasków:
    public static async editTask(id: ObjectId, task: TaskType): Promise<void> {
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
}

// Wypadało by dorobić jakąś walidację i obsługę błędu, nie wiem jak chcemy do tego podejsć, więc narazie to zostawiam.

// Zrobiłem wszystkie metody statyczne, nie wiem czy to dobre rozwiązanie czy nie, chętnie to przegadam na dsc. Jak macie jakieś propozycje to piszcie.