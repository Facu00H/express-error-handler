import { NextFunction, Request, Response } from 'express';

/**
 * Middleware to handle asynchronous route handlers and forward errors to the error handler.
 * @param {Function} fn - The async function to wrap
 * @returns {Function} - A function that resolves the promise and forwards any error to next().
 */
export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };