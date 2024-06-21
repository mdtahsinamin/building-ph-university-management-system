import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { facultySearchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';
import { Faculty } from './faculty.model';
import AppError from '../../errors/AppError';
import { User } from '../users/user.model';
import httpStatus from 'http-status';

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    Faculty.find().populate('academicDepartment'),
    query,
  )
    .search(facultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await facultyQuery.modelQuery;

  return result;
};

const getSingleFacultyFromDB = async (id: string) => {
  const result = await Faculty.findById({ id }).populate('academicDepartment');

  return result;
};

const updateFacultyFromDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  const result = await Faculty.findByIdAndUpdate({ id }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });

  return result;
};

/* Delete */
const deleteFacultyFromBD = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedFaculty) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to Delete Faculty user',
      );
    }

    const userId = deletedFaculty.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete User');
    }

    session.commitTransaction();
    session.endSession();

    return deletedFaculty;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_GATEWAY, 'Failed to Delete Faculty user');
  }
};

export const FacultyServices = {
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyFromDB,
  deleteFacultyFromBD,
};
