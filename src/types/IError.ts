export interface IError extends Error {
    message: string;
    statusCode: number;
    errorCode: string;
    isOperational?: boolean;
}