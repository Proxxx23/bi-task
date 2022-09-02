import {Book} from "../../models/Book";
import {DBBook} from "../../models/DBBook";

export type BookId = number; // fixme: should be placed somewhere else

export interface BooksRepository {
    all(limit?: number, offset?: number): Promise<DBBook[] | undefined>,
    add(book: Book): number | bigint,
    update(bookId: BookId, book: Book): number | bigint,
    find(bookId: BookId): Promise<DBBook | undefined>,
    findByISBN(isbn: string): Promise<DBBook | undefined>,
    remove(bookId: BookId): void,
}
