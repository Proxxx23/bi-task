import {Request, Response} from "express";
import {createBooksRepository} from "../infrastructure/db/booksRepository";
import {StatusCodes} from "http-status-codes";
import type {BookId} from "../application/db/booksRepository";
import {DBBook} from "../models/DBBook";
import type {AddCommentRequest} from "./requests/addCommentRequest";
import {createCommentsRepository} from "../infrastructure/db/commentsRepository";

const booksRepository = createBooksRepository();
const commentsRepository = createCommentsRepository();

export const create = async (req: Request<{ id: BookId }, {}, AddCommentRequest>, res: Response): Promise<Response<DBBook[] | string>> => {
    const bookId = req.params.id;
    const bookExists = await booksRepository.find(bookId);
    if (!bookExists) {
        return res.status(StatusCodes.NOT_FOUND).send('Book with given id does not exist.');
    }

    try {
        commentsRepository.add(bookId, req.body.comment);
        return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal error - comment could not have been added!');
    }
}

