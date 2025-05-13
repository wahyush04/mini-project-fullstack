import express from 'express';
import * as LogController from '../controllers/log.controller';
import { authenticateToken } from '../util/authMiddleware';

const router = express.Router();

router.get('/completed-exams', authenticateToken, LogController.getUserLogs);
router.post('/create-and-update', authenticateToken, LogController.createLogsAndUpdateStatus);

export default router;
