import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidations } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidations.createAcademicFacultyValidation),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);

router.get('/:id', AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidations.updateAcademicFacultyValidation),
  AcademicFacultyControllers.updateSingleAcademicFaculty,
);

export const AcademicFacultyRoutes = router;
