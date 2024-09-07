import { NextFunction, Request, Response} from "express";

/**
 * Middleware to handle asynchronous route handlers and foward errors to the error handler.
 * @param {Function} fn - The async function to wrap
 * @return {Function} - A function that will resolve the promise and foward any error to next().
 */
export const asyncHandler = (fn: Function): Function => 
    (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
    