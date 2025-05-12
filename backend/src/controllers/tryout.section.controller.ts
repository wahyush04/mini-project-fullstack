import { Request, Response } from 'express';
import * as TryoutSectionService from '../services/tryout.section.service';

export const getTryoutSections = async (req: Request, res: Response) => {
  const courses = await TryoutSectionService.getAllTryoutSections();
  res.json(courses);
};

export const getTryoutSectionById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const course = await TryoutSectionService.getTryoutSectionById(id);
  
    if (!course) res.status(404).json({ message: 'Course not found' });
  
    res.json(course);
  };
  