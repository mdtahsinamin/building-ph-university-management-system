import { z } from 'zod';

const createAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department must be string',
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Department must be string',
      required_error: 'Faculty is required',
    }),
  }),
});

const updateAcademicDepartmentValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic Department must be string',
        required_error: 'Name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic Department must be string',
        required_error: 'Faculty is required',
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidations = {
  createAcademicDepartmentValidation,
  updateAcademicDepartmentValidation,
};
