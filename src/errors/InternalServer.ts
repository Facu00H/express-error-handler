import { BaseError } from "./BaseError";

export class InternalServerError extends BaseError {
    /**
     * Create a new InternalServerError instance
     * @param {string} message - The error message (e.g., "Internal server error")
     */

    constructor(message: string = "Internal server error") {
        super(message, 500, 'INTERNAL_SERVER_ERROR');
    }
}