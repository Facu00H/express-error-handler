import { BaseError } from "./BaseError";

export class ServiceUnaivalibleError extends BaseError {
    /**
     * Create a new ServiceUnaivalibleError instance
     * @param {string} message - The error message (e.g., "Service unaivalible")
     */

    constructor(message: string = "Service unaivalible") {
        super(message, 400, 'SERVICE_UNAVAILABLE');
    }
}