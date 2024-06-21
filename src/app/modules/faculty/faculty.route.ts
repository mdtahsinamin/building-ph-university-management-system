import express from 'express';
import { FacultyControllers } from './faculty.controller';

const router = express.Router();

router.get('/', FacultyControllers.getAllFaculties);
router.get('/:id', FacultyControllers.getSingleFaculty);
router.patch('/:id', FacultyControllers.updateFaculty);
router.delete('/:id', FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;
