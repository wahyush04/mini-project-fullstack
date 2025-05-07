import { Request, Response } from 'express';
import * as UserService from '../services/users.service';

export const getUsers = async (req: Request, res: Response) => {
  const courses = await UserService.getAllUsers();
  res.json(courses);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const course = await UserService.getUserById(id);
  if (!course) res.status(404).json({ message: 'Course not found' });
  res.json(course);
};