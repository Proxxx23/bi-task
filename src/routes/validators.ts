import {body, validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";

export const validateAddBookRequest = [
    body('title')
        .trim()
        .escape()
        .isString()
        .isLength(
            {
                min: 1,
                max: 255,
            }
        )
        .withMessage('Book title must be a string of length between 1 and 255 characters!')
        .bail(),
    body('author')
        .trim()
        .escape()
        .isString()
        .isLength(
            {
                min: 1,
                max: 255,
            }
        )
        .withMessage('Book author(s) must be a string of length between 1 and 255 characters!')
        .bail(),
    body('isbn')
        .custom(
            (isbn: string) => {
                // Simple check (10 or 13 characters) with no checksum
                if (!isbn.match('(ISBN[-]*(1[03])*[ ]*(: ){0,1})*(([0-9Xx][- ]*){13}|([0-9Xx][- ]*){10})')) {
                    throw new Error('Invalid ISBN format!');
                }

                return true;
            }
        )
        .withMessage('Year of production cannot be empty!')
        .bail(),
    body('pagesCount')
        .isFloat(
            {
                min: 1,
                max: 9999,
            }
        )
        .withMessage('Pages count must be a numeric value within 1 and 9999 range')
        .bail(),
    body('rating')
        .isFloat(
            {
                min: 1,
                max: 5,
            }
        )
        .withMessage('Rating must be a numeric value within 1 and 5 range'),
    body('comment')
        .optional()
        .trim()
        .escape()
        .isString()
        .isLength(
            {
                min: 1,
                max: 1000,
            }
        )
        .withMessage('Comment must be a string not longer than 1000 characters'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({errors: errors.array()});
        }

        next();
    },
];
