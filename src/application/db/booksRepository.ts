import {Book} from "../../models/Book";

export type BookId = number;

export interface BooksRepository {
    all(limit: number, offset: number): Promise<Book[]>,
    add(book: Book): void,
    update(bookId: BookId, book: Book): void,
    find(bookId: BookId): Promise<Book>,
    findByISBN(isbn: string): Promise<Book>,
    remove(bookId: BookId): void,
}
