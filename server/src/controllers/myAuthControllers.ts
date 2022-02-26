import { Request, Response } from "express";
import { MyUserRecord } from "../record/myUserRecord";

import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

export const signIn = async (req: Request, res: Response) => {

  try {
    // zalogowanie użytkownika
    const user = await MyUserRecord.findByEmail(String(req.body.email));
    if(!user) return res.status(401).json({info:'Entered data is not valid'});

    // sprawdzenie hasła
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if(!isPasswordValid) return res.status(401).json({info:'Entered data is not valid'});

    const token = jwt.sign(user, process.env.JWT_ACCESS, {expiresIn:'10m'});

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

    // utworzenie użytkownika przy rejestracji.
    await MyUserRecord.createUser(req.body);

    // odszukanie w bazie użytkownika żeby pobrać dane razem z nadanym ObjectID
    const user = await MyUserRecord.findByEmail(String(req.body.email));

    // utworzenie tokena dla sesji dla zarejestrowanego użytkownika.
    const token = jwt.sign(user, process.env.JWT_ACCESS, {expiresIn:'10m'});

    // wysłanie użytkownika z tokenem.
    res.status(200).json({user, token});

  } catch (error) {

    console.log('error SignUp controller', error.message);
    res.status(400).json(error.message);
  }
}