import {Request, Response} from "express";



    export function showMainPage(req: Request, res: Response){
        res.status(200).json({info:'Main page'})
    }


