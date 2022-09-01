"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAddBookRequest = void 0;
const express_validator_1 = require("express-validator");
const http_status_codes_1 = require("http-status-codes");
exports.validateAddBookRequest = [
    (0, express_validator_1.body)('title')
        .trim()
        .escape()
        .isString()
        .isLength({
        min: 1,
        max: 255,
    })
        .withMessage('Book title must be a string of length between 1 and 255 characters!')
        .bail(),
    (0, express_validator_1.body)('author')
        .trim()
        .escape()
        .isString()
        .isLength({
        min: 1,
        max: 255,
    })
        .withMessage('Book author(s) must be a string of length between 1 and 255 characters!')
        .bail(),
    (0, express_validator_1.body)('isbn')
        .custom((isbn) => {
        // Simple check (10 or 13 characters) with no checksum
        if (!isbn.match('(ISBN[-]*(1[03])*[ ]*(: ){0,1})*(([0-9Xx][- ]*){13}|([0-9Xx][- ]*){10})')) {
            throw new Error('Invalid ISBN format!');
        }
        return true;
    })
        .withMessage('Year of production cannot be empty!')
        .bail(),
    (0, express_validator_1.body)('pagesCount')
        .isFloat({
        min: 1,
        max: 9999,
    })
        .withMessage('Pages count must be a numeric value within 1 and 9999 range')
        .bail(),
    (0, express_validator_1.body)('rating')
        .isFloat({
        min: 1,
        max: 5,
    })
        .withMessage('Rating must be a numeric value within 1 and 5 range'),
    (0, express_validator_1.body)('comment')
        .optional()
        .trim()
        .escape()
        .isString()
        .isLength({
        min: 1,
        max: 1000,
    })
        .withMessage('Comment must be a string not longer than 1000 characters'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
        }
        next();
    },
];
//# sourceMappingURL=validators.js.map