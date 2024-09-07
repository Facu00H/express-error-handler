/**
 * Union type for all possible error codes.
 * This type ensures that only valid error codes are used throughout the application.
 */
export type ErrorCodes =
  // General HTTP errors
  | 'INTERNAL_SERVER_ERROR'
  | 'NOT_FOUND'
  | 'BAD_REQUEST'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'CONFLICT'
  | 'TOO_MANY_REQUESTS'
  | 'SERVICE_UNAVAILABLE'

  // Validation errors
  | 'VALIDATION_ERROR'
  | 'MISSING_REQUIRED_FIELDS'
  | 'INVALID_INPUT'
  | 'EMAIL_ALREADY_EXISTS'
  | 'USERNAME_ALREADY_EXISTS'
  | 'PASSWORD_TOO_WEAK'

  // Authentication/Authorization errors
  | 'AUTHENTICATION_FAILED'
  | 'INVALID_TOKEN'
  | 'TOKEN_EXPIRED'
  | 'ACCESS_DENIED'
  | 'INSUFFICIENT_PERMISSIONS'

  // Database-related errors
  | 'DATABASE_ERROR'
  | 'DUPLICATE_KEY'
  | 'RECORD_NOT_FOUND'
  | 'CONNECTION_FAILED'
  | 'QUERY_FAILED'

  // External service errors
  | 'EXTERNAL_SERVICE_ERROR'
  | 'THIRD_PARTY_API_ERROR'
  | 'API_RATE_LIMIT_EXCEEDED'

  // File handling errors
  | 'FILE_UPLOAD_ERROR'
  | 'FILE_TOO_LARGE'
  | 'UNSUPPORTED_FILE_TYPE'

  // Specific resource-related errors
  | 'USER_NOT_FOUND'
  | 'PRODUCT_NOT_FOUND'
  | 'ORDER_NOT_FOUND'

  // Payment-related errors
  | 'PAYMENT_FAILED'
  | 'INVALID_PAYMENT_METHOD'
  | 'PAYMENT_PROCESSING_ERROR';