// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import * as AuthService from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  const { fullname, username, phoneNumber, email, password } = req.body;

  try {
    const result = await AuthService.registerUser(fullname, username, phoneNumber, email, password);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await AuthService.loginUser(email, password);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};
