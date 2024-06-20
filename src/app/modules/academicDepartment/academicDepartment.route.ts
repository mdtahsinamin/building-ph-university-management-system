import express from 'express';
import { AcademicDepartmentValidations } from './academicDepartment.validation';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentControllers } from './academicDepartment.controller';

const router = express.Router();


router.post(
  '/create-academic-department',
  validateRequest(AcademicDepartmentValidations.createAcademicDepartmentValidation),
  AcademicDepartmentControllers.createAcademicDepartment,
);

router.get('/', AcademicDepartmentControllers.getAllAcademicFaculties);

router.get('/:id', AcademicDepartmentControllers.getSingleAcademicDepartment);

router.patch(
  '/:id',
  validateRequest(AcademicDepartmentValidations.updateAcademicDepartmentValidation),
  AcademicDepartmentControllers.updateSingleAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
