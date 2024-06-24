import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is created Successfully !!',
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is retrieved Successfully !',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is retrieved by id Successfully !',
    data: result,
  });
});

const updateSingleAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updatedAcademicFacultyData = req.body;

  const result =
    await AcademicFacultyServices.updateSingleAcademicFacultyIntoDB(
      id,
      updatedAcademicFacultyData,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Seamster was updated by id Successfully !',
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateSingleAcademicFaculty,
};
