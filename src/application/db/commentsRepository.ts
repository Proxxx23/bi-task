import {BookId} from "./booksRepository";

export interface CommentsRepository {
    add(bookId: BookId, comment: string): void,
    findByBookId(bookId: BookId, limit: number): { comment: string }[],
}
