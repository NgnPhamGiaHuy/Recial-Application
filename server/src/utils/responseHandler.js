/**
 * Response Handler Module
 * 
 * Provides a consistent API for sending HTTP responses across all controllers.
 * Standardizes response format with { success, message, data } structure.
 */

/**
 * HTTP Status Codes with default messages
 */
const HTTP_STATUS = {
    OK: { code: 200, message: 'Success' },
    CREATED: { code: 201, message: 'Resource created successfully' },
    BAD_REQUEST: { code: 400, message: 'Bad request' },
    UNAUTHORIZED: { code: 401, message: 'Unauthorized' },
    FORBIDDEN: { code: 403, message: 'Forbidden' },
    NOT_FOUND: { code: 404, message: 'Resource not found' },
    CONFLICT: { code: 409, message: 'Resource conflict' },
    UNPROCESSABLE_ENTITY: { code: 422, message: 'Validation error' },
    INTERNAL_SERVER_ERROR: { code: 500, message: 'Internal server error' }
};

/**
 * Base response formatter
 * @param {boolean} success - Whether the operation was successful
 * @param {string} message - Response message
 * @param {object|array|null} data - Optional payload
 * @param {string|null} errorCode - Optional error code for error responses
 * @returns {object} Formatted response object
 */
const formatResponse = (success, message, data = null, errorCode = null) => {
    const response = {
        success,
        message
    };

    if (data !== null) {
        response.data = data;
    }

    if (errorCode) {
        response.errorCode = errorCode;
    }

    return response;
};

/**
 * Send a success response
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {object|array|null} data - Optional payload
 */
const sendSuccess = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json(
        formatResponse(true, message, data)
    );
};

/**
 * Send an error response
 * @param {object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {string|null} errorCode - Optional error code
 * @param {object|null} data - Optional error details
 */
const sendError = (res, statusCode, message, errorCode = null, data = null) => {
    return res.status(statusCode).json(
        formatResponse(false, message, data, errorCode)
    );
};

// Pre-defined response handlers for common status codes
const responseHandler = {
    // Success responses
    ok: (res, data = null, message = HTTP_STATUS.OK.message) =>
        sendSuccess(res, HTTP_STATUS.OK.code, message, data),

    created: (res, data = null, message = HTTP_STATUS.CREATED.message) =>
        sendSuccess(res, HTTP_STATUS.CREATED.code, message, data),

    // Error responses
    badRequest: (res, message = HTTP_STATUS.BAD_REQUEST.message, errorCode = 'BAD_REQUEST', data = null) =>
        sendError(res, HTTP_STATUS.BAD_REQUEST.code, message, errorCode, data),

    unauthorized: (res, message = HTTP_STATUS.UNAUTHORIZED.message, errorCode = 'UNAUTHORIZED', data = null) =>
        sendError(res, HTTP_STATUS.UNAUTHORIZED.code, message, errorCode, data),

    forbidden: (res, message = HTTP_STATUS.FORBIDDEN.message, errorCode = 'FORBIDDEN', data = null) =>
        sendError(res, HTTP_STATUS.FORBIDDEN.code, message, errorCode, data),

    notFound: (res, message = HTTP_STATUS.NOT_FOUND.message, errorCode = 'NOT_FOUND', data = null) =>
        sendError(res, HTTP_STATUS.NOT_FOUND.code, message, errorCode, data),

    conflict: (res, message = HTTP_STATUS.CONFLICT.message, errorCode = 'CONFLICT', data = null) =>
        sendError(res, HTTP_STATUS.CONFLICT.code, message, errorCode, data),

    validationError: (res, message = HTTP_STATUS.UNPROCESSABLE_ENTITY.message, errorCode = 'VALIDATION_ERROR', data = null) =>
        sendError(res, HTTP_STATUS.UNPROCESSABLE_ENTITY.code, message, errorCode, data),

    serverError: (res, message = HTTP_STATUS.INTERNAL_SERVER_ERROR.message, errorCode = 'INTERNAL_SERVER_ERROR', data = null) =>
        sendError(res, HTTP_STATUS.INTERNAL_SERVER_ERROR.code, message, errorCode, data),

    // Custom response with any status code
    custom: (res, statusCode, success, message, data = null, errorCode = null) => {
        return res.status(statusCode).json(
            formatResponse(success, message, data, errorCode)
        );
    }
};

module.exports = responseHandler; 