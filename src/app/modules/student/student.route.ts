import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidations } from './student.validation';

const router = express.Router();

//router.post('/create-student', StudentControllers.createStudent);
router.get('/', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudent);
router.patch(
  '/:id',
  validateRequest(StudentValidations.updateStudentValidationSchema),
  StudentControllers.updateStudent,
);
router.delete('/:id', StudentControllers.deleteStudent);
export const StudentRoute = router;
