import { Schema, model } from 'mongoose';
import { TFaculty } from './faculty.interface';
import { TUserName } from '../student/student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First Name is required'],
    maxlength: [20, 'First Name can not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
  },
});

const facultySchema = new Schema<TFaculty>(
  {
    id: {
      type: String,
      required: [true, 'Faculty ID is required'],
      unique: true,
    },

    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'user id is required'],
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'designation is required'],
    },

    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },

    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female', 'Other'],
        message: '{VALUE} is not a valid gender',
      },
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, 'contactNo is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'emergencyContactNo is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: [true, 'presentAddress is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'permanentAddress is required'],
    },
    profileImg: {
      type: String,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'academicDepartment id is required'],
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  },
);

// virtual

facultySchema.virtual('fullName').get(function () {
  return `${this.name?.firstName} ${this.name?.middleName} ${this.name?.lastName}`;
});

// query
facultySchema.pre('find', function (next) {
  // current query exec hoyar age -> service aste changing
  this.find({ isDeleted: { $ne: true } });

  next();
});

facultySchema.pre('findOne', function (next) {
  // current query exec hoyar age -> service aste changing
  this.find({ isDeleted: { $ne: true } });

  next();
});

export const Faculty = model<TFaculty>('Faculty', facultySchema);
