import {Request, Response} from "express";
import {createBooksRepository} from "../infrastructure/db/booksRepository";
import {StatusCodes} from "http-status-codes";
import type {BookId} from "../application/db/booksRepository";
import {createBookFromRequest} from "../factories/bookFactory";
import type {CreateBookRequest} from "./requests/createBookRequest";
import type {UpdateBookRequest} from "./requests/updateBookRequest";
import {DBBook} from "../models/DBBook";

type OffsetQueryParams = {
    limit?: number,
    offset?: number
}

const repository = createBooksRepository();

export const index = async (req: Request<{}, {}, {}, OffsetQueryParams>, res: Response): Promise<Response<DBBook>> => {
    return res.json(
        await repository.all(req.query.limit, req.query.offset)
    );
}

export const create = async (req: Request<{}, {}, CreateBookRequest>, res: Response): Promise<Response<DBBook[] | string>> => {
    const bookExists = await repository.findByISBN(req.body.isbn);
    if (bookExists) {
        return res.status(StatusCodes.CONFLICT).send('Book with given ISBN already exists in DB.');
    }

    const book = createBookFromRequest(req.body);

    try {
        repository.add(book);

        return res.send(
            {
                data: book
            }
        );
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal error - book could not have been added!');
    }
}

export const update = async (req: Request<{ id: BookId }, undefined, UpdateBookRequest>, res: Response): Promise<Response<DBBook[] | string>> => {
    const bookId = req.params.id;
    const bookExists = await repository.find(bookId);
    if (!bookExists) {
        return res.status(StatusCodes.NOT_FOUND).send('Book with given id not found.');
    }

    try {
        repository.update(bookId, createBookFromRequest(req.body));

        return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal error - book could not have been edited!');
    }
}

export const destroy = async (req: Request<{ id: BookId }>, res: Response): Promise<any | string> => {
    const bookId = req.params.id;
    const book = await repository.find(bookId);
    if (!book) {
        return res.status(StatusCodes.NOT_FOUND).send('Book with given id not found.');
    }

    try {
        repository.remove(bookId);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal error - book could not have been removed!');
    }

    return res.sendStatus(StatusCodes.OK);
}
