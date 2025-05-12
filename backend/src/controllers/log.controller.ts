import { Request, Response } from 'express';
import * as LogService from '../services/logs.service';

export const getUserLogs = async (req: Request, res: Response) => {
  try {
    const logs = await LogService.getAllCompletedLogs();
    res.json({ status: 'success', message: 'Successfully get logs', data: logs });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createLogsAndUpdateStatus = async (req: Request, res: Response) => {
  try {
    const result = await LogService.createLogsAndUpdateStatus(req.body.data, req.body.examId);
    res.status(200).json({ message: "Create Log and Update Status Successfully", data: result });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};