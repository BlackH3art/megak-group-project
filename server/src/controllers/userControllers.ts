import {Task} from "../models/task";
import {TaskRecord} from "../record/task.record";
import { Request, Response } from 'express';
import { SchemaTypes } from "mongoose";

// dodanie nowego zadania
export const addTask = async (req: Request, res: Response) => {
  try {
const {title, body, priority } = req.body
    if(!title || !body){
      res.status(400).json({info:'Task title and contents are required'})
      return// tu będzie docelowo osbługa naszymi errorami, wtedy bez bloku try/catch
    }
await TaskRecord.addTask(req.body)
    res.status(200).json({info:'Task created'})
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
   const taskToUpdate = {
      ...oldTask,
     ...newTask
   }
   await TaskRecord.editTask(new SchemaTypes.ObjectId(id),taskToUpdate)
res.status(200).json('Task updated')

  } catch (error) {
    console.log(error)
    res.status(400).json(error.message)



  }
}

export const deleteTask = async (req: Request, res: Response) => {
  try {
    // usuwanie zadania





  } catch (error) {
    // obsługa błędu



  }
}