import {Request, Response} from "express";
import {createBooksRepository} from "../infrastructure/db/booksRepository";
import {Book, RatingsRange} from "../models/Book";
import {StatusCodes} from "http-status-codes";
import {createBookFromRequest} from "../factories/bookFactory";
import {BookId} from "../application/db/booksRepository";

interface OffsetRequest {
    limit?: number,
    offset?: number
}

export interface BookRequest {
    title: string,
    isbn: string,
    pagesCount: number,
    rating: RatingsRange,
}

const repository = createBooksRepository();

export const index = async (req: Request<{}, {}, {}, OffsetRequest>, res: Response): Promise<Response<Book>> => {
    return res.json(
        repository.all(req.query.limit, req.query.offset)
    );
}

export const create = async (req: Request<{}, {}, BookRequest>, res: Response): Promise<Response<Book[] | string>> => {
    const book = createBookFromRequest(req.body);
    const moviesRepository = createBooksRepository();

    try {
        await moviesRepository.add(book);

        return res.send(
            {
                data: book
            }
        );
    } catch (err) {
        if (err instanceof Error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Internal error - movie not added!');
    }
}

export const destroy = async (req: Request<{}, {}, {}, { bookId: BookId }>, res: Response): Promise<any | string> => {
    const bookId = req.query.bookId;
    const book = repository.findByUuid(bookId);
    if (!book) {
        return res.status(StatusCodes.NOT_FOUND).send('Book with given id not found.');
    }

    try {
        repository.remove(req.query.bookId);
    } catch (err) {
        return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }

    return res.sendStatus(StatusCodes.OK);
}
