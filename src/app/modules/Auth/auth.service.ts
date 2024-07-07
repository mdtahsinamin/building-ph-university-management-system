import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../users/user.model';
import { TLoginUser } from './auth.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from './auth.utils';
import { JwtPayload } from 'jsonwebtoken';
import { sendEmail } from '../../utils/sendEmail';
const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exists
  const user = await User.isUserExistsByCustomId(payload?.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  // checking if the user is already deleted
  const isDeletedUser = user?.isDeleted;

  if (isDeletedUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  // checking if the password is correct

  if (!(await User.isPasswordMatch(payload?.password, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password not match !');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  // Access Granted : Send Access Token & Refresh token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exists
  const user = await User.isUserExistsByCustomId(userData?.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  // checking if the user is already deleted
  const isDeletedUser = user?.isDeleted;

  if (isDeletedUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  // checking if the password is correct

  if (!(await User.isPasswordMatch(payload?.oldPassword, user.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password not match !');
  }

  // hash new password
  const newHashPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findByIdAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashPassword,
      newPasswordChange: true,
      passwordChangedAt: new Date(),
    },
  );
  return null;
};

const refreshToken = async (token: string) => {
  // check if the token is valid or not
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { userId, iat } = decoded;

  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  // checking if the user is already deleted
  const isDeletedUser = user?.isDeleted;

  if (isDeletedUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  // password change

  if (
    user.passwordChangedAt &&
    (await User.isJWTIssuedBeforePasswordChange(
      user.passwordChangedAt,
      iat as number,
    ))
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized! ');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  // Access Granted : Send Access Token & Refresh token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (userId: string) => {
  const user = await User.isUserExistsByCustomId(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  // checking if the user is already deleted
  const isDeletedUser = user?.isDeleted;

  if (isDeletedUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  // Access Granted : Send Access Token & Refresh token
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  );

  const resetUILink = `${config.reset_pass_ui_link}?id=${user?.id}&token=${resetToken}`;

  sendEmail(user?.email, resetUILink);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }

  // checking if the user is already deleted
  const isDeletedUser = user?.isDeleted;

  if (isDeletedUser) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

  const decoded = verifyToken(token, config.jwt_access_secret as string);

  if (payload?.id !== decoded.id) {
    throw new AppError(httpStatus.FORBIDDEN, 'Your are forbidden');
  }

  // hash new password
  const newHashPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findByIdAndUpdate(
    {
      id: decoded?.id,
      role: decoded.role,
    },
    {
      password: newHashPassword,
      newPasswordChange: true,
      passwordChangedAt: new Date(),
    },
  );
};

export const AuthServices = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
