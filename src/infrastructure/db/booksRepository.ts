import {BookId, BooksRepository} from "../../application/db/booksRepository";
import {Book} from "../../models/Book";

import Database from "better-sqlite3";

export const createBooksRepository = (): BooksRepository => booksRepository();

const db = new Database(__dirname + '/../../../db/books.db', {
    fileMustExist: true
});

function booksRepository(): BooksRepository {
    async function all(limit: number = 100, offset: number = 0): Promise<any> {
        // todo: create DB DTO object
        return db.prepare(`SELECT * FROM books LIMIT ? OFFSET ?`)
            .get(limit, offset);
    }

    async function find(bookId: BookId): Promise<any> {
        // todo: create DB DTO object
        return db.prepare(`SELECT * FROM books WHERE id = ?`)
            .get(bookId);
    }

    async function findByISBN(isbn: string): Promise<any> {
        // todo: create DB DTO object
        return db.prepare(`SELECT * FROM books WHERE isbn = ?`)
            .get(isbn);
    }

    function add(book: Book): void {
        db.prepare(`INSERT INTO
            books
                (
                    title,
                    isbn,
                    author,
                    pages_count,
                    rating
                )
            VALUES
                (?, ?, ?, ?, ?)`)
            .run(book.title, book.isbn, book.author, book.pagesCount, book.rating);
    }

    function update(bookId: BookId, book: Book): void {
        db.prepare(`UPDATE
                books
            SET
                title = ?,
                isbn = ?,
                author = ?,
                pages_count = ?,
                rating = ?
            WHERE
                id = ${bookId}`)
            .run(book.title, book.isbn, book.author, book.pagesCount, book.rating);
    }

    function remove(bookId: BookId): void {
        db.prepare('DELETE FROM books WHERE id = ?')
            .run(bookId);
    }

    return {
        all,
        find,
        findByISBN,
        update,
        add,
        remove
    };
}
