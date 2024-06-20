import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res, next) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is created Successfully !!',
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res, next) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is retrieved Successfully !',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is retrieved by id Successfully !',
    data: result,
  });
});

const updateSingleAcademicDepartment = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedAcademicDepartmentData = req.body;

  const result =
    await AcademicDepartmentServices.updateSingleAcademicDepartmentIntoDB(
      id,
      updatedAcademicDepartmentData,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Seamster was updated by id Successfully !',
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicFaculties,
  getSingleAcademicDepartment,
  updateSingleAcademicDepartment,
};
