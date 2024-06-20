import { Types } from "mongoose";

export interface TAcademicDepartment {
    name: string;
    academicFaculty: Types.ObjectId;
}