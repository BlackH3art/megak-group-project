import {Request, Response} from "express";

export class MainControllers {

    public showMainPage(req: Request, res: Response) {
        res.status(200).json({info:'Main page'})
    }


}