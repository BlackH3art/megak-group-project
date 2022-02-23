import mongoose, {Schema, Types} from 'mongoose';
import { Request, Response } from "express";
import { TaskItem } from "../models/MyTaskModel";
import { MyUserRecord } from "../record/myUserRecord";
import { MyUserInterface } from "../types/myUserInterface";
import {TaskRecord} from "../record/task.record";
import {Users} from "../models/MyUserModel";
import myAuthRouter from "../routes/myAuthRouter";
import { SchemaTypes } from 'mongoose'
import * as Mongoose from "mongoose";



export const addTask = async (req: Request, res: Response) => {

  const { userId } = req.params;
  const { task, createdAt, isDone } = req.body;
  
  try {
    
    // upewnić się że przekazane ID jest poprawnym ObjectId.
    if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send('No user with that ID');
    
    const user: MyUserInterface = await MyUserRecord.getOne(userId);
    
    if (!task) {
      res.status(400).json({info: 'Task content are required'});
      return;
    }
    
    // utworzenie taska na podstawie modelu mongoose - tu tworzy się "subdokument"
    const newTask = new TaskItem(req.body);
    
    // push taska (subdokumentu) do tablicy
    await user.tasks.push(newTask);

    // zapisanie zmian na rodzicu.
    await user.save();
    
    res.status(200).json({info: 'Task created'});
    
    
  } catch (error) {
    console.log('error - adding task', error);
    res.status(400).json(error.message);
  }
}

export const getUserTasks =  async (req: Request, res: Response) => {
  let {userId} = req.params
    const user = await Users.findById(userId)
    res.status(200).json(user.tasks)
  return;
}
// zostawiam niedokończone bo nie wiem jaki argument podać aby wyszukać konkretnego taska z tablicy tasków (zwykłe id nie znajduje nic)
export const updateTask = async (req: Request, res: Response) => {
  const {userId, taskId} = req.params
  console.log(userId,taskId)
  const user = await Users.findById(userId)
  let tasks = user.tasks

  res.status(200).json('test')
}

export const deleteTask = (req: Request, res: Response) => {
  return;
}
export const deleteUser = (req: Request, res: Response) => {
  return;
}