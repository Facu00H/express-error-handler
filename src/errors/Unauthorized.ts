import { BaseError } from "./BaseError";

export class UnauthorizedError extends BaseError {
    /**
     * Create a new UnauthorizedError instance
     * @param {string} message - The error message (e.g., "Unauthorized")
     */

    constructor(message: string = "Unauthorized") {
        super(message, 401, 'UNAUTHORIZED');
    }
}