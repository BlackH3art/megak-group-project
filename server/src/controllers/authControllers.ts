import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {jwtAccsess} from "../config";
import {User} from '../models/user';
import {UserRecord} from "../record/user.record";

// access token na potrzeby generowania tokenu - do przeniesienia do przeniesienia do pliku ENV


export const signInUser = async (req: Request, res: Response) => {
  const users = await User.find()
  try {
    // zalogowanie użytkownika
    let user = await User.findOne({ userName: req.body.userName });

    if(!user) {
      res.status(401).json({info:'Entered data is not valid'});
      return;
    }
    const isPasswordValid = await user.checkPassword(req.body.password);
    if(!isPasswordValid) {
      res.status(401).json({info:'Entered data is not valid'});
      return;
    }
    // generowanie jwt po wpisaniu prawidłowego hasła
    // user = user.toJSON()
    const token = jwt.sign(user.toJSON(), jwtAccsess, {expiresIn:'10m'});
    res.status(200).json({token});
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
}

export const signUpUser = async (req: Request, res: Response) => {
  try {
    // zarejestrowanie użytkownika
    const { email, userName, password } = req.body;
    if(!email || !userName || !password){
      res.status(400).json({info:'Email, username and password are required'});
      return;
    }
    await UserRecord.createUser(req.body);
    res.status(200).json({info:'Signed up'});
  } catch (error) {
    // obsługa błędu
    console.log(error);
    res.status(400).json(error.message);
  }
}

export const showMainPage = (req: Request, res: Response) => {
  res.status(200).json({info:'Main page'})
}
