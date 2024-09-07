import { ErrorCodes } from "../types/ErrorCodes";
import { IError } from "../types/IError";

/**
 * Base class for all API-related errors.
 */
export class BaseError extends Error implements IError {
    message: string;
    statusCode: number;
    errorCode: ErrorCodes;
    isOperational?: boolean;

    /**
     * Create a new instance of ApiError
     * @param {string} message - Error message.
     * @param {number} statusCode - HTTP status code.
     * @param {ErrorCodes} errorCode - Custom error code.
     * @param {boolena} isOperational [isOperational = true] - Whether the error is operational (true by default)
     */
    constructor(message: string, statusCode: number, errorCode: ErrorCodes, isOperational?: boolean) {
        super()
        this.errorCode = errorCode;
        this.isOperational = isOperational;
        this.message = message;
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}
