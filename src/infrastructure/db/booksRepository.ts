import {BookId, BooksRepository} from "../../application/db/booksRepository";
import {Book} from "../../models/Book";
import {DBBook} from "../../models/DBBook";
import {databaseConnection} from "./connection";

const DEFAULT_LIMIT = 100;
const DEFAULT_OFFSET = 0;

export const createBooksRepository = (): BooksRepository => booksRepository();

const db = databaseConnection();

function booksRepository(): BooksRepository {
    async function all(limit: number | undefined = DEFAULT_LIMIT, offset: number | undefined = DEFAULT_OFFSET): Promise<DBBook[]> {
        // fixme: should not return book.id
        return db.prepare(`SELECT
                                *
                           FROM
                                books b
                           LEFT JOIN
                                (SELECT * FROM comments LIMIT 5) c
                           ON
                                b.id = c.book_id
                           GROUP BY
                                b.id
                           LIMIT ? OFFSET ?`)
            .all(limit, offset);
    }

    async function find(bookId: BookId): Promise<DBBook> {
        return db.prepare(`SELECT title, isbn, author, pages_count, rating FROM books WHERE id = ?`)
            .get(bookId);
    }

    async function findByISBN(isbn: string): Promise<DBBook> {
        return db.prepare(`SELECT title, isbn, author, pages_count, rating FROM books WHERE isbn = ?`)
            .get(isbn);
    }

    function add(book: Book): number | bigint {
        return db.prepare(`INSERT INTO
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
            .run(book.title, book.isbn, book.author, book.pagesCount, book.rating)
            .lastInsertRowid;
    }

    function update(bookId: BookId, book: Book): number | bigint {
        return db.prepare(`UPDATE
                books
            SET
                title = ?,
                isbn = ?,
                author = ?,
                pages_count = ?,
                rating = ?
            WHERE
                id = ${bookId}`)
            .run(book.title, book.isbn, book.author, book.pagesCount, book.rating)
            .lastInsertRowid;
    }

    function remove(bookId: BookId): void {
        db.prepare(`DELETE FROM books WHERE id = ?`)
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
