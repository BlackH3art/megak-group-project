import mongoose from 'mongoose';
import { Request, Response } from "express";

import { TaskItem } from "../models/MyTaskModel";
import { MyUserRecord } from "../record/myUserRecord";
import { MyUserInterface } from "../types/myUserInterface";
import {Users} from "../models/MyUserModel";



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



export const getUserTasks =  async (req: Request, res: Response) => {

  const {userId} = req.params;

  const user = await Users.findById(userId);
  res.status(200).json(user.tasks);
}



export const updateTask = async (req: Request, res: Response) => {

  const updatedTask = req.body;
  const {userId, taskId} = req.params;
  console.log(userId, taskId);

  try {

    // sprawdzenie czy podane ID są poprawne
    if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({ info: "Invalid user id"});
    if(!mongoose.Types.ObjectId.isValid(taskId)) return res.status(404).json({ info: "Invalid task id"});

    // sprawdzenie czy istnieje task o tym ID
    if(!(await Users.findById(userId)).tasks.id(taskId)) return res.status(404).send('No task with that ID');

    const user: MyUserInterface = await Users.findById(userId);

    // odszukanie taska po ID w kolekcji subdocumentów - metoda .id()
    const taskToUpdate = user.tasks.id(taskId);

    // to powinno zachować właściwości starego taska w tablicy
    // oraz nadpisać nowe właściwości które przyjdą z frontu - do przetestowania
    const updatedTaskInTasksArray = await taskToUpdate.set({ ...taskToUpdate, ...updatedTask});

    // zapisanie zmian na rodzicu
    await user.save();

    res.status(200).json({ info: "change saved", updatedTask: updatedTaskInTasksArray});

  } catch (error) {
    console.log('error updating task', error.message);
    console.log(error);

    res.status(400).json({ info: "Error with updating task"});
  }
}




export const deleteTask = async (req: Request, res: Response) => {

  const {userId, taskId} = req.params;

  try {
    // sprawdzenie czy podane ID są poprawne
    if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({ info: "Invalid user id"});
    if(!mongoose.Types.ObjectId.isValid(taskId)) return res.status(404).json({ info: "Invalid task id"});

    // sprawdzenie czy istnieje task o tym ID
    if(!(await Users.findById(userId)).tasks.id(taskId)) return res.status(404).send('No task with that ID');


    // usuwanie
    const user: MyUserInterface = await Users.findById(userId);
    await user.tasks.id(taskId).remove();

    await user.save();


    res.status(200).json({ info: `task ID: ${taskId} has been deleted successfully` });

  } catch (error) {
    console.log('error deleting task', error.message);
    console.log(error);

    res.status(400).json({ info: "Error with deleting task"});
  }
}



export const deleteUser = async (req: Request, res: Response) => {

  const { userId } = req.params;

  try {
    // sprawdzenie czy podane ID usera jest poprawne oraz czy istnieje taki użytkownik
    if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).json({ info: "Invalid user id"});
    if(!await Users.findById(userId)) return res.status(404).send('No user with that ID');

    // usuwanie użytkownika o wskazanym numerze ID
    await Users.findByIdAndDelete(userId);

    res.status(200).json(`Account ID: ${userId} has been deleted`);

  } catch (error) {
    console.log('error deleting user', error.message);
    console.log(error);

    res.status(400).json({ info: "Error with deleting user"});
  }
}