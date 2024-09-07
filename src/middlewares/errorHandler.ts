import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../errors/BaseError';
import { ValidationError } from '../errors';

/**
 * Centralized error handler middleware.
 * Handles instances of ApiError and generic errors.
 * @param {ApiError | Error} err - The error thrown by the application.
 * @param {Request} req - Express Request object.
 * @param {Response} res - Express Response object.
 * @param {NextFunction} next - Function to pass control to the next middleware.
 */
export const errorHandler = (err: BaseError | Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    const errorResponse: any = {
      status: 'error',
      statusCode: err.statusCode,
      errorCode: err.errorCode,
      message: err.message,
      errors: err.errors
    };

    return res.status(err.statusCode).json(errorResponse);
  }

  // Check if the error is an instance of ApiError (custom error classes)
  if (err instanceof BaseError) {
    const statusCode = err.statusCode || 500;
    const errorCode = err.errorCode || 'INTERNAL_SERVER_ERROR';
    const message = err.message || 'Internal Server Error';

    // Build the error response
    const errorResponse: any = {
      status: 'error',
      statusCode,
      errorCode,
      message,
    };

    // Attach the stack trace in development or test environments for debugging
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
      errorResponse.stack = err.stack;
    }

    // Return the error response
    return res.status(statusCode).json(errorResponse);
  }

  // If it's not an instance of ApiError, treat it as a generic error
  const genericErrorResponse: any = {
    status: 'error',
    statusCode: 500,
    errorCode: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong',
  };

  // Attach the stack trace in development or test environments for debugging
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    genericErrorResponse.stack = err.stack;
  }

  // Return the generic error response
  res.status(500).json(genericErrorResponse);
};