import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
    /**
     * Create a new BadRequestError instance
     * @param {string} message - The error message (e.g., "Bad request")
     */

    constructor(message: string = "Bad request") {
        super(message, 400, 'BAD_REQUEST');
    }
}