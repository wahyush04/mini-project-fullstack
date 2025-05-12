import express from 'express';
import * as LogController from '../controllers/log.controller';

const router = express.Router();

router.get('/completed-exams', LogController.getUserLogs);
router.post('/create-and-update', LogController.createLogsAndUpdateStatus);

export default router;
