import { BaseError } from "./BaseError";

export class ValidationError extends BaseError {
    errors: any[];
    /**
     * Create a new ValidationError instance
     * @param {string} message - The error message (e.g., "Invalid input/field")
     * @param {any[]} errors - List of especific validation errors.
     */

    constructor(message: string = "Invalid input/field", errors: any[] = []) {
        super(message, 400, 'VALIDATION_ERROR');
        this.errors = errors;
    }
}