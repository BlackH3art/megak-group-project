import {Request, Response} from "express";
import {User} from "../models/user";
import {UserFromRequest} from "../types/userFromRequest";
import {TaskRecord} from "../record/task.record";
import {SchemaTypes} from "mongoose";
import {UserRecord} from "../record/user.record";
import * as mongoose from "mongoose";



export const showProfile = async function (req:Request,res:Response){
    // @ts-ignore
    const id = req.user._id
    try {
        const user = await User.findById(id)
        if(!user){
            res.status(400).json({info:`Task with id ${id} doesnt exist`})
            return
        }
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message)
    }
}

export const deleteUser = async function (req:Request, res:Response){
    // @ts-ignore
    const userEmail = req.user.email
    await User.deleteOne({email:userEmail})
    res.status(200).json(`Account ${userEmail} deleted.`)
}

