import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../users/user.model';
import httpStatus from 'http-status';
import { Admin } from './admin.model';
import { adminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(adminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;

  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById({ id });

  return result;
};

const updateAdminFromDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingFacultyData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate({ id }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });

  return result;
};

/* Delete */
const deleteAdminFromBD = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedAdmin) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to Delete Faculty user',
      );
    }

    const userId = deletedAdmin.user;

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

    return deletedAdmin;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_GATEWAY, 'Failed to Delete Faculty user');
  }
};

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminFromDB,
  deleteAdminFromBD,
};
