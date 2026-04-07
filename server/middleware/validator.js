const AppError = require('../utils/appError');

const validate = (schema) => {
    return (req, res, next) => {
        const missingFields = schema.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return next(new AppError(`Missing required fields: ${missingFields.join(', ')}`, 400));
        }

        next();
    };
};

module.exports = validate;
