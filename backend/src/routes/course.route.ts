import express from 'express';
import * as CourseController from '../controllers/course.controller';
import { authenticateToken } from '../util/authMiddleware';

const router = express.Router();

router.get('/', authenticateToken, CourseController.getCourses);
router.get('/:id', authenticateToken, CourseController.getCourseById);
router.post('/', authenticateToken, CourseController.createCourse);
router.put('/:id', authenticateToken, CourseController.updateCourse);
router.delete('/:id', authenticateToken, CourseController.deleteCourse);

export default router;
