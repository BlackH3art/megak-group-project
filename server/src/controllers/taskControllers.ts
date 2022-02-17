import {Task} from "../models/task";
import {TaskRecord} from "../record/task.record";
import {Request, Response} from 'express';
import {SchemaTypes} from "mongoose";

// dodanie nowego zadania
export const addTask = async (req: Request, res: Response) => {
    try {
        const {title, body, priority} = req.body
        if (!title || !body) {
            res.status(400).json({info: 'Task title and contents are required'})
            return// tu będzie docelowo osbługa naszymi errorami, wtedy bez bloku try/catch
        }
        await TaskRecord.addTask(req.body)
        res.status(200).json({info: 'Task created'})
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
}
// aktualizacja zadania
export const updateTask = async (req: Request, res: Response) => {
    try {
        const newTask = req.body
        const id = req.params.taskId
        const oldTask = await Task.findById(id)
        if(!oldTask){
            res.status(400).json({info:`Task with id ${id} doesnt exist`})
            return
        }
        const taskToUpdate = {
            ...oldTask,
            ...newTask
        }
        await TaskRecord.editTask(new SchemaTypes.ObjectId(id), taskToUpdate)
        res.status(200).json('Task updated')

    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
}

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await TaskRecord.getAll()
        res.status(200).json(tasks)
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }

}

export const getOneTask = async (req: Request, res: Response) => {
    const id = req.params.taskId
    try {
        const task = await TaskRecord.getOne(new SchemaTypes.ObjectId(id))
        if(!task){
            res.status(400).json({info:`Task with id ${id} doesnt exist`})
            return
        }
        res.status(200).json(task)
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }

}

export const deleteTask = async (req: Request, res: Response) => {
    const id = req.params.taskId
    try {
       const deletedTask = await TaskRecord.deleteTask(new SchemaTypes.ObjectId(id))
        if(!deletedTask){
            res.status(400).json({info:`Task with id ${id} doesnt exist`})
            return
        }
        res.status(200).json({info:'Task deleted'})
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)


    }
}