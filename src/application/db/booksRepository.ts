import {Book} from "../../models/Book";

export type BookId = string; // uuid actually

export interface BooksRepository {
    all(limit: number, offset: number): Promise<any>, // array
    add(book: Book): void,
    findByUuid(bookId: BookId): Promise<any>,
    remove(bookId: BookId): void,
}
