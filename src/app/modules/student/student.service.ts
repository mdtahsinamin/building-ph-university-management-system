import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../users/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  // {email : {$regex: query.searchTerm, $options: 'i'}}
  // {name.firstName : {$regex: query.searchTerm, $options: 'i'}}
  // {presentAddress : {$regex: query.searchTerm, $options: 'i'}}

  // let searchTerm = '';
  // const queryObj = { ...query };

  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }

  // // first changing, searchTerm
  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' }, // []
  //   })),
  // });

  // // filtering for extract match
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  // excludeFields.forEach((elt) => delete queryObj[elt]);

  // // second changing
  // const filterQuery = searchQuery
  //   .find(queryObj)
  // .populate('admissionSemester')
  // .populate({
  //   path: 'academicDepartment',
  //   populate: {
  //     path: 'academicFaculty',
  //   },
  // });

  // // for sort
  // let sort = '-createdAt';

  // if (query.sort) {
  //   sort = query.sort as string;
  // }

  // // third changing
  // const sortQuery = filterQuery.sort(sort);

  // // pagination
  // let page = 1;
  // let limit = 1;

  // let skip = 0;

  // if (query.limit) {
  //   limit = Number(query.limit);
  // }

  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }

  // const paginateQuery = sortQuery.skip(skip);

  // // for limit

  // const limitQuery = paginateQuery.limit(limit);

  // // field limiting

  // let fields = '-__v';

  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }

  // const fieldQuery = await limitQuery.select(fields);

  // return fieldQuery;

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),

    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromBD = async (id: string) => {
  //const result = await Student.findOne({ id });
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  // transform

  /**
   * guardian : {
   *   fatherOccupation: "Teacher"
   * }
   * guardian.fatherOccupation = Teacher
   *
   */

  // entries return key and value of the object

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }

  const user = await Student.findOneAndUpdate({ id }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });

  return user;
};

/* Delete */
const deleteStudentFromBD = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete User');
    }

    session.commitTransaction();
    session.endSession();

    return deletedStudent;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_GATEWAY, 'Failed to Delete Student');
  }
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromBD,
  deleteStudentFromBD,
  updateStudentIntoDB,
};
