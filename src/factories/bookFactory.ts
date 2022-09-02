import {CreateBookRequest, UpdateBookRequest} from "../controllers/booksController";
import {Book} from "../models/Book";

export const createBookFromRequest = (request: CreateBookRequest | UpdateBookRequest): Book => {
    return new Book(
        request.title,
        request.isbn,
        request.author,
        request.pagesCount,
        request.rating
    )
}
