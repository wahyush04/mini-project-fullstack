import express from 'express';
import * as ExamController from '../controllers/exam.controller';
import { authenticateToken } from '../util/authMiddleware';

const router = express.Router();

router.get('/', authenticateToken, ExamController.getAllExams);
router.post('/', authenticateToken, ExamController.createExams);
router.put('/:id', authenticateToken, ExamController.updateExamStatus);

export default router;
