import { Schema, model } from 'mongoose';
import { TaskPriority } from '../types/taskType';

export const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now(),
    },
    priority: {
        type: Number,
        default: TaskPriority.Normal, // Mozna zrobić np. priority 0 - mało ważne, dlatego default jak sie nie poda, 1 - wazne, 2? - bardzo ważne
    },
    body: {
        type: String,
        required: true,
        trim: true,
    },
    isDone: {
        type: Boolean,
        default: false,
    }
});

export const Task = model('Task', taskSchema);

// Jak się bardziej znacie to chętnie zobaczę poprawki :)