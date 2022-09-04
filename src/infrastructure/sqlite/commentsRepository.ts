import {BookId} from "../../application/db/booksRepository";
import {databaseConnection} from "./connection";
import {CommentsRepository} from "../../application/db/commentsRepository";

export const createCommentsRepository = (): CommentsRepository => commentsRepository();

const db = databaseConnection();

function commentsRepository(): CommentsRepository {
    function add(bookId: BookId, comment: string): void {
        db.prepare(`INSERT INTO
            comments
                (
                    book_id,
                    comment
                )
            VALUES
                (?, ?)`)
            .run(bookId, comment);
    }

    function findByBookId(bookId: BookId, limit: number = 5): { comment: string }[] {
        return db.prepare(`SELECT comment FROM comments WHERE book_id = ? LIMIT ?`).all(bookId, limit);
    }

    return {
        add,
        findByBookId,
    };
}
