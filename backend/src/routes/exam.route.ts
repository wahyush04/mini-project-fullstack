import express from 'express';
import * as ExamController from '../controllers/exam.controller';

const router = express.Router();

router.get('/', ExamController.getAllExams);
router.post('/', ExamController.createExams);
router.put('/:id', ExamController.updateExamStatus);

export default router;
