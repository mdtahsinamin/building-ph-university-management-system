//*  Higher order function -> takes function as a parameter also return a function
//*  catchAsync receive async function

import { NextFunction, Request, RequestHandler, Response } from 'express';

//*  handler it execute the async function when route hit it's controller

//*  we need to assign the async handler

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      next(err);
    }); //* error sent to global error handler
  };
};

export default catchAsync;
