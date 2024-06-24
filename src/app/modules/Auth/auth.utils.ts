import jwt from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(
    {
      data: jwtPayload,
    },
    secret,
    { expiresIn: expiresIn },
  );
};
