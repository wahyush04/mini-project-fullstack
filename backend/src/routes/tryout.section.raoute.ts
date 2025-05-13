import express from 'express';
import * as TryoutSectionController from '../controllers/tryout.section.controller';
import { authenticateToken } from '../util/authMiddleware';

const router = express.Router();

router.get('/', authenticateToken, TryoutSectionController.getTryoutSections);
router.get('/:id', authenticateToken, TryoutSectionController.getTryoutSectionById);
// router.post('/', TryoutSectionController.createCourse);
// router.put('/:id', TryoutSectionController.updateCourse);
// router.delete('/:id', TryoutSectionController.deleteCourse);

export default router;
