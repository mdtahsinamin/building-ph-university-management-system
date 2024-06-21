import { Types } from 'mongoose';
import { TUserName } from '../student/student.interface';

export interface TFaculty {
  id: string;
  user: Types.ObjectId;
  designation: string;
  name: TUserName;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  profileImg?: string;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
}
