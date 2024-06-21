import { Schema, model } from 'mongoose';
import { TAdmin } from './admin.interface';
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

const adminSchema = new Schema<TAdmin>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    designation: {
      type: String,
      required: true,
    },
    name: {
      type: userNameSchema,
      required: true,
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
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    emergencyContactNo: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid Blood group',
      },
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
      required: true,
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

adminSchema.virtual('fullName').get(function () {
  return `${this.name?.firstName} ${this.name?.middleName} ${this.name?.lastName}`;
});

adminSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

adminSchema.pre('findOne', async function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

export const Admin = model<TAdmin>('Admin', adminSchema);
