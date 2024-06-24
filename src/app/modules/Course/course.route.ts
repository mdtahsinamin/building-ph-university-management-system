import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidation } from './course.validation';
import { CourseControllers } from './course.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-course',
  auth('admin'),
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get(
  '/',
  auth('admin', 'faculty', 'student'),
  CourseControllers.getAllCourses,
);

router.get(
  '/:id',
  auth('admin', 'faculty', 'student'),
  CourseControllers.getSingleCourse,
);

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(CourseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.put(
  '/:courseId/assign-faculties',
  auth('admin'),
  validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  auth('admin'),
  validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

router.delete('/:id', auth('admin'),CourseControllers.deleteCourse);

export const CourseRoute = router;
