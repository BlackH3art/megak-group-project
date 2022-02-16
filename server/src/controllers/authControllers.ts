import {User} from '../models/user';
import {UserRecord} from "../record/user.record";
import { Request, Response } from 'express';

export const signInUser = async (req: Request, res: Response) => {
  try {
    // zalogowanie użytkownika
    const user = await User.findOne({ username: req.body.login });
    if(!user) {
      res.status(400).json({info:'Entered data is not valid'});
      return;
    }
    if(await user.checkPassword(req.body.password)) {
      res.status(200).json({info:'Signed in'});
    } else {
      res.status(400).json({info:'Entered data is not valid'});
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
    const { email, login, password } = req.body;
    if(!email || !login || !password){
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