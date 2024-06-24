import { Types } from 'mongoose';

export type TSemesterRegistration = {
  academicSemester: Types.ObjectId;
  status: 'UPCOMING' | 'ONGOING' | 'ENDED';
  startDate: Date;
  endState: Date;
  minCredit: number;
  maxCredit: number;
};
