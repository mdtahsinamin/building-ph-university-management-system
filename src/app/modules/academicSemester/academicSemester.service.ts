import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid Semester Code ');
  }

  const result = await AcademicSemester.create(payload);

  return result;
};
const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();

  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findById({ _id: id });

  return result;
};

const updateSingleAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new AppError(
      httpStatus.UNPROCESSABLE_ENTITY,
      'Invalid Semester Code ',
    );
  }
  const result = await AcademicSemester.findByIdAndUpdate(
    {
      _id: id,
    },
    payload,
    {
      new: true,
    },
  );

  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateSingleAcademicSemesterIntoDB,
};

// * create a find route all academic semester

// * create a find route for a single academic semester using _id

//* create an update route for updating a single academic semester route using _id
