import express from 'express';
import * as LogController from '../controllers/log.controller';

const router = express.Router();

router.get('/completed-exams/:userId', LogController.getUserLogs);

export default router;
