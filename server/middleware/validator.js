const AppError = require('../utils/appError');

/**
 * Middleware to validate the request body against a required schema
 * @param {string[]} schema - Array of required field names
 * @returns {Function} - Express middleware function
 */
const validate = (schema) => {
    return (req, res, next) => {
        // Identify any fields present in the schema but missing from the request body
        const missingFields = schema.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return next(new AppError(`Missing required fields: ${missingFields.join(', ')}`, 400));
        }

        next();
    };
};

module.exports = validate;
