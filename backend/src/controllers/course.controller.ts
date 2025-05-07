import { Request, Response } from 'express';
import * as CourseService from '../services/course.service';

export const getCourses = async (req: Request, res: Response) => {
  const courses = await CourseService.getAllCourses();
  res.json(courses);
};

export const getCourseById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const course = await CourseService.getCourseById(id);
    console.log('course', course)
  
    if (!course) res.status(404).json({ message: 'Course not found' });
  
    res.json(course);
  };
  

export const createCourse = async (req: Request, res: Response) => {
  const course = await CourseService.createCourse(req.body);
  res.status(201).json(course);
};

export const updateCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await CourseService.updateCourse(id, req.body);
  res.json(updated);
};

export const deleteCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  await CourseService.deleteCourse(id);
  res.status(204).send();
};
