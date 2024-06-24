import { Types } from 'mongoose';

export interface TPreRequisiteCourses {
  course: Types.ObjectId;
  isDeleted: boolean;
}

export interface TCourse {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: [TPreRequisiteCourses];
  isDeleted?: boolean;
}

export interface TCourseFaculty {
  course: Types.ObjectId;
  faculties: [Types.ObjectId];
}
