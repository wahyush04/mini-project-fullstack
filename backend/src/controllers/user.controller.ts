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

export const updateUserPoints = async (req: Request, res: Response) => {
  try {
    const result = await UserService.updateUserPoint(req.params.id, req.body.points);
    res.status(200).json({ message: "Update Exam Successfully", data: result });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
