import { BaseError } from "./BaseError";

export class ConflictError extends BaseError {
    /**
     * Create a new ConflictError instance
     * @param {string} message - The error message (e.g., "Conflict")
     */

    constructor(message: string = "Conflict") {
        super(message, 409, 'CONFLICT');
    }
}