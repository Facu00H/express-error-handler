import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
    /**
     * Create a new NotFoundError instance
     * @param {string} message - The error message (e.g., "Resource not found")
     */

    constructor(message: string = "Resource not found") {
        super(message, 404, 'NOT_FOUND');
    }
}