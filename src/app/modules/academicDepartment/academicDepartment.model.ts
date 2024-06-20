import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, 'AcademicSemester id is required'], // reference
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

// before document processing
academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExit = await AcademicDepartment.findOne({
    name: this.name,
  });

  if (isDepartmentExit) {
    throw new AppError(httpStatus.NOT_FOUND, 'This department already exits');
  }
  next();
});

// query middlewares
// before query processing
academicDepartmentSchema.pre('findOneAndDelete', async function (next) {
  const query = this.getQuery();

  const isDepartmentExit = await AcademicDepartment.findOne(query);

  if (!isDepartmentExit) {
    throw new AppError(httpStatus.NOT_FOUND, 'This department does not exits');
  }

  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
