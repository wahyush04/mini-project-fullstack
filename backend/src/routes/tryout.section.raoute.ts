import express from 'express';
import * as TryoutSectionController from '../controllers/tryout.section.controller';

const router = express.Router();

router.get('/', TryoutSectionController.getTryoutSections);
router.get('/:id', TryoutSectionController.getTryoutSectionById);
// router.post('/', TryoutSectionController.createCourse);
// router.put('/:id', TryoutSectionController.updateCourse);
// router.delete('/:id', TryoutSectionController.deleteCourse);

export default router;
