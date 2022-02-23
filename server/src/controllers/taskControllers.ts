import {Task} from "../models/task";
import {TaskRecord} from "../record/task.record";
import {Request, Response} from 'express';
import {SchemaTypes} from "mongoose";
import {UserRecord} from "../record/user.record";

// dodanie nowego zadania
export const addTask = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        // przepraszam za any ale bez typu wywala błąd, że typeUser nie ma methody save()
        const user: any = await UserRecord.getOne(req.user._id);
        const {title, body, priority} = req.body
        if (!title || !body) {
            res.status(400).json({info: 'Task title and contents are required'})
            return// tu będzie docelowo osbługa naszymi errorami, wtedy bez bloku try/catch
        }
        const taskId = await TaskRecord.addTask(req.body)
        user.tasks.push(await TaskRecord.getOne(taskId))
        await user.save()

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
        await TaskRecord.editTask(id, taskToUpdate)
        res.status(200).json('Task updated')

    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
}

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const tasks = await TaskRecord.getAllUserTasks(req.user._id)
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
       const deletedTask = await TaskRecord.deleteTask(id)
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