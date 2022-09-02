import {Book} from "../../models/Book";
import {DBBook} from "../../models/DBBook";

export type BookId = number;

export interface BooksRepository {
    all(limit?: number, offset?: number): Promise<DBBook[] | undefined>,
    add(book: Book): void,
    update(bookId: BookId, book: Book): void,
    find(bookId: BookId): Promise<DBBook | undefined>,
    findByISBN(isbn: string): Promise<DBBook | undefined>,
    remove(bookId: BookId): void,
}
