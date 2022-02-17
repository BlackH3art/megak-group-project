import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../models/user';
import {UserRecord} from "../record/user.record";

// access token na potrzeby generowania tokenu - do przeniesienia do przeniesienia do pliku ENV
const JWT_TOKEN = 'tokenDoJWTdoPrzeniesieniaDoPlikuENV';

export const signInUser = async (req: Request, res: Response) => {
  try {
    // zalogowanie użytkownika
    const user = await User.findOne({ userName: req.body.login });
    if(!user) {
      res.status(401).json({info:'Entered data is not valid'});
      return;
    }
    const isPasswordValid = await user.checkPassword(req.body.password);
    if(isPasswordValid) {
      // generowanie jwt po wpisaniu prawidłowego hasła
      const token = jwt.sign(user.toJSON(), JWT_TOKEN);
      res.status(200).json({token});
    } else {
      res.status(401).json({info:'Entered data is not valid'});
      return;
    }
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
