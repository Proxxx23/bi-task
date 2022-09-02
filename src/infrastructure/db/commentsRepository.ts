import {BookId} from "../../application/db/booksRepository";
import {databaseConnection} from "./connection";
import {CommentsRepository} from "../../application/db/commentsRepository";

export const createCommentsRepository = (): CommentsRepository => commentsRepository();

const {dbTable, connection: db} = databaseConnection('comments');

function commentsRepository(): CommentsRepository {
    function add(bookId: BookId, comment: string): void {
        db.prepare(`INSERT INTO
            ${dbTable}
                (
                    book_id,
                    comment
                )
            VALUES
                (?, ?)`)
            .run(bookId, comment);
    }

    function findByBookId(bookId: BookId, limit: number = 5): { comment: string }[] {
        return db.prepare(`SELECT comment FROM ${dbTable} WHERE book_id = ? ORDER BY id LIMIT ?`).all(bookId, limit);
    }

    return {
        add,
        findByBookId,
    };
}
