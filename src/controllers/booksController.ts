import {Request, Response} from "express";
import {createBooksRepository} from "../infrastructure/db/booksRepository";
import {StatusCodes} from "http-status-codes";
import type {BookId} from "../application/db/booksRepository";
import {createBookFromRequest} from "../factories/bookFactory";
import type {CreateBookRequest} from "./requests/createBookRequest";
import type {UpdateBookRequest} from "./requests/updateBookRequest";
import {DBBook} from "../models/DBBook";
import {createCommentsRepository} from "../infrastructure/db/commentsRepository";

type OffsetQueryParams = {
    perPage?: number,
    offset?: number
}

const booksRepository = createBooksRepository();
const commentsRepository = createCommentsRepository();

interface IndexResponse extends DBBook {
    lastComments: string[];
}

export const index = async (req: Request<{}, {}, {}, OffsetQueryParams>, res: Response): Promise<Response<IndexResponse>> => {
    const books = await booksRepository.all(req.query.perPage, req.query.offset);

    // fixme: very DB extensive, should be preformed in joined query or using ORM relation
    const data = [];
    books.forEach((book) => {
        const comments = commentsRepository.findByBookId(book.id, 5);
        data.push(
            {
                ...book,
                last_comments: comments
            }
        );
    })

    return res.json(data);
}

export const create = async (req: Request<{}, {}, CreateBookRequest>, res: Response): Promise<Response<DBBook[] | string>> => {
    const bookExists = await booksRepository.findByISBN(req.body.isbn);
    if (bookExists) {
        return res.status(StatusCodes.CONFLICT).send('Book with given ISBN already exists in DB.');
    }

    const book = createBookFromRequest(req.body);

    try {
        const id = booksRepository.add(book);

        return res.send(
            {
                data: {
                    id,
                    ...book
                }
            }
        );
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal error - book could not have been added!');
    }
}

export const update = async (req: Request<{ id: BookId }, undefined, UpdateBookRequest>, res: Response): Promise<Response<DBBook[] | string>> => {
    const bookId = req.params.id;
    const bookExists = await booksRepository.find(bookId);
    if (!bookExists) {
        return res.status(StatusCodes.NOT_FOUND).send('Book with given id not found.');
    }

    try {
        booksRepository.update(bookId, createBookFromRequest(req.body));

        return res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal error - book could not have been edited!');
    }
}

export const destroy = async (req: Request<{ id: BookId }>, res: Response): Promise<any | string> => {
    const bookId = req.params.id;
    const book = await booksRepository.find(bookId);
    if (!book) {
        return res.status(StatusCodes.NOT_FOUND).send('Book with given id not found.');
    }

    try {
        booksRepository.remove(bookId);
    } catch (err) {
        console.log(err);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal error - book could not have been removed!');
    }

    return res.sendStatus(StatusCodes.NO_CONTENT);
}
