// src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import * as ExamServices from '../services/exam.service';

export const getAllExams = async (req: Request, res: Response) => {
  const courses = await ExamServices.getAllExams();
  res.json(courses);
};
export const createExams = async (req: Request, res: Response) => {
  try {
    const result = await ExamServices.createExams( req.body);
    res.status(201).json({ message: "Create Exam Successfully", data: result });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateExamStatus = async (req: Request, res: Response) => {
  try {
    const result = await ExamServices.updateStatusCourse(req.params.id, req.body);
    res.status(200).json({ message: "Update Exam Successfully", data: result });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
