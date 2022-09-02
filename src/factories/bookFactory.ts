import {Book} from "../models/Book";
import type {CreateBookRequest} from "../controllers/requests/createBookRequest";
import type {UpdateBookRequest} from "../controllers/requests/updateBookRequest";

export const createBookFromRequest = (request: CreateBookRequest | UpdateBookRequest): Book => {
    return new Book(
        request.title,
        request.isbn,
        request.author,
        request.pagesCount,
        request.rating
    )
}
