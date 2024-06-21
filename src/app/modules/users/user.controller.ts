import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

//* create student

//*  dry -> don't repeat yourself

// catchAsync avoid the try catch block
const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body; // password and student data from request body

  const result = await UserServices.createStudentIntoDB(password, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty } = req.body;

  const result = await UserServices.createFacultyIntoDB(password, faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty user is created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin } = req.body;

  const result = await UserServices.createAdminIntroDB(password, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin User is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
};
