import { BaseError } from "./BaseError";

export class ForbiddenError extends BaseError {
    /**
     * Create a new ForbiddenError instance
     * @param {string} message - The error message (e.g., "Forbidden")
     */

    constructor(message: string = "Forbidden") {
        super(message, 403, 'FORBIDDEN');
    }
}