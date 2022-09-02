import {BookId, BooksRepository} from "../../application/db/booksRepository";
import {Book} from "../../models/Book";
import {DBBook} from "../../models/DBBook";
import {databaseConnection} from "./connection";

const DEFAULT_LIMIT = 100;
const DEFAULT_OFFSET = 0;

export const createBooksRepository = (): BooksRepository => booksRepository();

// fixme: there should be a standalone test repository for testing suites
const {dbTable, connection: db} = databaseConnection('books');

function booksRepository(): BooksRepository {
    async function all(limit: number | undefined = DEFAULT_LIMIT, offset: number | undefined = DEFAULT_OFFSET): Promise<DBBook[] | undefined> {
        return db.prepare(`SELECT * FROM ${dbTable} ORDER BY id LIMIT ? OFFSET ?`)
            .all(limit, offset);
    }

    async function find(bookId: BookId): Promise<DBBook | undefined> {
        return db.prepare(`SELECT * FROM ${dbTable} WHERE id = ?`)
            .get(bookId);
    }

    async function findByISBN(isbn: string): Promise<DBBook | undefined> {
        return db.prepare(`SELECT * FROM ${dbTable} WHERE isbn = ?`)
            .get(isbn);
    }

    function add(book: Book): number | bigint {
        return db.prepare(`INSERT INTO
            ${dbTable}
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
                ${dbTable}
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
        db.prepare(`DELETE FROM ${dbTable} WHERE id = ?`)
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
