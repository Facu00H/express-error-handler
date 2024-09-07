import { BaseError } from "./BaseError";

export class TooManyRequestError extends BaseError {
    /**
     * Create a new TooManyRequestError instance
     * @param {string} message - The error message (e.g., "Too many requests")
     */

    constructor(message: string = "Too many requests") {
        super(message, 429, 'TOO_MANY_REQUESTS');
    }
}