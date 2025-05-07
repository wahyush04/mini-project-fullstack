import { Request, Response } from 'express';
import * as LogService from '../services/logs.service';

export const getUserLogs = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log('userId c', userId);
  try {
    const logs = await LogService.getLogsByUserAndCodes(userId);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};