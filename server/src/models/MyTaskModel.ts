import { Schema, model } from 'mongoose';

export const myTaskSchema = new Schema({
    task: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: Date.now(),
    },
    isDone: {
        type: Boolean,
        default: false,
    }
});

export const TaskItem = model("TaskItem", myTaskSchema);