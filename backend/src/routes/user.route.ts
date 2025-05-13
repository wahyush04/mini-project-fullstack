import express from 'express';
import * as UserController from '../controllers/user.controller';
import { authenticateToken } from '../util/authMiddleware';

const router = express.Router();

router.get('/', authenticateToken, UserController.getUsers);
router.get('/:id', authenticateToken, UserController.getUserById);
router.put('/:id', authenticateToken, UserController.updateUserPoints);

export default router;
