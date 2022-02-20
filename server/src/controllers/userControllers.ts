import {Request, Response} from "express";
import {User} from "../models/user";
import {UserType} from "../types/userType";
import {UserFromRequest} from "../types/userFromRequest";


export const showProfile = async function (req:UserFromRequest,res:Response){

    const id = req.user._id
const user = await User.findById(id)
    res.status(200).json(user)
}

export const deleteUser = async function (req:UserFromRequest, res:Response){
    const id = req.user._id
    await User.findByIdAndDelete(id)
    res.status(200).json(`User with id ${id} deleted.`)
}