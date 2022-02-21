import { Request, Response } from "express";
import { MyUserRecord } from "src/record/myUserRecord";

import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import {jwtAccsess} from "../config";

export const signIn = async (req: Request, res: Response) => {

  try {
    // zalogowanie użytkownika
    const user = await MyUserRecord.findByEmail(String(req.body.email));
    if(!user) res.status(401).json({info:'Entered data is not valid'});

    // sprawdzenie hasła
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if(!isPasswordValid) res.status(401).json({info:'Entered data is not valid'});


    const token = jwt.sign(user, jwtAccsess, {expiresIn:'10m'});

    res.status(200).json({ user, token });


  } catch (error) {

    console.log('error SignIn controller', error.message);
    res.status(400).json(error.message);
  }
}

export const signUp = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body;

    if(!email || !password) res.status(400).json({info:'Email, username and password are required'});

    const user = await MyUserRecord.createUser(req.body);
    res.status(200).json(user);

  } catch (error) {

    console.log('error SignUp controller', error.message);
    res.status(400).json(error.message);
  }
}