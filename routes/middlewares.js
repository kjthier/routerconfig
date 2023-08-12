import { check, validationResult } from 'express-validator';

// middleware for validation
export const validateUserFields = [
    check('first_name').notEmpty().isString().withMessage('A valid first name is required'),
    check('last_name').notEmpty().isString().withMessage('A valid last name is required')
];
  
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ errors });
    }
    next();
};
  
// Middleware for sending a 404 response if user is not found
export const userNotFound = (res, next) => {
    res.status(404).json({ message: 'User not found' });
    next();
};
  
// Middleware for handling success responses (200)
export const requestSuccess = (res, data) => {
    res.status(200).json(data);
};
  
// Middleware for handling 500 errors
export const requestError = (res, err) => {
    res.status(500).json({ message: err.message });
};
  