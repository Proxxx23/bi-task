import {Request, Response} from "express";
import {createBooksRepository} from "../infrastructure/db/booksRepository";
import {Book, RatingsRange} from "../models/Book";
import {StatusCodes} from "http-status-codes";
import {BookId} from "../application/db/booksRepository";
import {createBookFromRequest} from "../factories/bookFactory";

type OffsetQueryParams = {
    limit?: number,
    offset?: number
}

export type CreateBookRequest = {
    title: string,
    isbn: string,
    author: string,
    pagesCount: number,
    rating: RatingsRange,
}

export type UpdateBookRequest = CreateBookRequest;

const repository = createBooksRepository();

export const index = async (req: Request<{}, {}, {}, OffsetQueryParams>, res: Response): Promise<Response<Book>> => {
    // todo: pagination
    return res.json(
        await repository.all(req.query.limit, req.query.offset)
    );
}

export const create = async (req: Request<{}, {}, CreateBookRequest>, res: Response): Promise<Response<Book[] | string>> => {
    const bookExists = await repository.findByISBN(req.body.isbn);
    if (bookExists) {
        return res.status(StatusCodes.CONFLICT).send('Book with given ISBN already added into DB.');
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

export const update = async (req: Request<{ id: BookId }, undefined, UpdateBookRequest>, res: Response): Promise<Response<Book[] | string>> => {
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
