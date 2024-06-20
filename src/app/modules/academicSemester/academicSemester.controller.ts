import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res, next) => {
  const academicSemesterData = req.body;

  const result =
    await AcademicSemesterServices.createAcademicSemesterIntoDB(
      academicSemesterData,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Seamster is created Successfully !',
    data: result,
  });
});

//
const getAllAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Seamster is retrieved Successfully !',
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res, next) => {
  const academicId = req.params.id;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(academicId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Seamster is retrieved by id Successfully !',
    data: result,
  });
});

const updateSingleAcademicSemester = catchAsync(async (req, res, next) => {
  const academicId = req.params.id;
  const updatedAcademicData = req.body;


  const result =
    await AcademicSemesterServices.updateSingleAcademicSemesterIntoDB(
      academicId,
      updatedAcademicData,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Seamster is retrieved by id Successfully !',
    data: result,
  });
});

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
};
