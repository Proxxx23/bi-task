import {BookId, BooksRepository} from "../../application/db/booksRepository";
import {Book} from "../../models/Book";

import Database from "better-sqlite3";

export const createBooksRepository = (): BooksRepository => booksRepository();

const db = new Database(__dirname + '/../../../db/books.sqlite', {
    fileMustExist: true
});

function booksRepository(): BooksRepository {
    async function all(limit: number = 100, offset: number = 0): Promise<any> {
        return db.prepare(`SELECT * FROM books LIMIT ? OFFSET ?`)
            .run(limit, offset);
    }

    async function findByUuid(bookId: BookId): Promise<any> {
        // todo: create DB DTO object
        return db.prepare(`SELECT * FROM books where uuid = ?`)
            .run(bookId);
    }

    function add(book: Book): void {
        db.exec(`INSERT INTO
        books
            (
                title,
                isbn,
                pagesCount,
                rating,
            )
        VALUES
            (
                ${book.title},
                ${book.isbn},
                ${book.pagesCount},
                ${book.rating},
            )`);
    }

    function remove(bookId: BookId): void {
        db.prepare('DELETE FROM books WHERE uuid = ?')
            .run(bookId);
    }

    return {
        all,
        findByUuid,
        add,
        remove
    };
}
