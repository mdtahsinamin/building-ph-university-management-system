import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidations } from '../student/student.validation';
import { FacultyValidation } from '../faculty/faculty.validation';
import { AdminValidations } from '../Admin/admin.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(StudentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(FacultyValidation.createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserControllers.createAdmin,
);

export const UserRoute = router;
