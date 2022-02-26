import {NextFunction, Response, Request} from "express";
import * as jwt from 'jsonwebtoken'
import {jwtAccsess} from "../src/config";

import { Users } from "../src/models/MyUserModel";

export async function userAuthMiddleware(req:Request, res:Response, next:NextFunction){
    const token = req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(401).json('Token invalid')
    }
    jwt.verify(token,jwtAccsess,(err,data)=>{
        if(err){
            return res.status(401).json('Token invalid')
        }
        // @ts-ignore
        req.user = data
        next();
    })
}
