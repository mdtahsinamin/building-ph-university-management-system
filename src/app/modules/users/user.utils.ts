import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

// when we use lean(), features
const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

// year semester 4 digit number
export const generateStudentId = async (payload: TAcademicSemester | null) => {
  if (!payload) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid academic semester data');
  }

  let currentId = (0).toString();

  const lastStudentId = await findLastStudentId();
  const lastSemesterCode = lastStudentId?.substring(4, 6); // 2030 010001
  const lastSemesterYear = lastStudentId?.substring(0, 4);

  if (
    lastStudentId &&
    lastSemesterCode === payload.code &&
    lastSemesterYear === payload.year
  ) {
    currentId = lastStudentId?.substring(6);
  }

  let incrementId = Number(currentId + 1)
    .toString()
    .padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
