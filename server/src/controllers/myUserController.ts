import mongoose from 'mongoose';
import { Request, Response } from "express";
import { TaskItem } from "../models/MyTaskModel";
import { MyUserRecord } from "../record/myUserRecord";
import { MyUserInterface } from "../types/myUserInterface";


export const deleteUser = (req: Request, res: Response) => {
  return;
}

export const addTask = async (req: Request, res: Response) => {

  const { userId } = req.params;
  const { task, createdAt, isDone } = req.body;

  try {

    // upewnić się że przekazane ID jest poprawnym ObjectId.
    if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send('No user with that ID');

    const user: MyUserInterface = await MyUserRecord.getOne(userId);

    if (!task || !createdAt) res.status(400).json({info: 'Task title and contents are required'});

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

export const updateTask = (req: Request, res: Response) => {
  return;
}

export const deleteTask = (req: Request, res: Response) => {
  return;
}