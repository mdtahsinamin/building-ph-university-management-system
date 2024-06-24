import { Router } from 'express';
import { StudentRoute } from '../modules/student/student.route';
import { UserRoute } from '../modules/users/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { AdminRoutes } from '../modules/Admin/admin.route';
import { CourseRoute } from '../modules/Course/course.route';
import { semesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route';
import { AuthRoute } from '../modules/Auth/auth.route';

const router = Router();

const modulesRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/students',
    route: StudentRoute,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/courses',
    route: CourseRoute,
  },
  {
    path: '/semester-registration',
    route: semesterRegistrationRoutes,
  },
  // {
  //   path: '/offered-courses',
  //   route:
  // },
  {
    path: 'auth',
    route: AuthRoute,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
