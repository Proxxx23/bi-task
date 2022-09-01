import {BookRequest} from "../controllers/booksController";
import {Book} from "../models/Book";

export const createBookFromRequest = (request: BookRequest): Book => {
    return new Book(
        request.title,
        request.isbn,
        request.pagesCount,
        request.rating,
    )
}
