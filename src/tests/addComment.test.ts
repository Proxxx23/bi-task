import request from "supertest";
import {StatusCodes} from "http-status-codes";
import {createTestServer} from "../testServer";
import {databaseConnection} from "../infrastructure/sqlite/connection";

describe('Endpoint to add comments', () => {
    const app = createTestServer();
    const db = databaseConnection();

    beforeEach(() => db.exec('DELETE FROM books'));
    afterAll(() => {
        db.exec('DELETE FROM comments');
        db.exec('DELETE FROM books');
    });

    it.skip('responds with 404 code if book with given id does not exist', async () => {
        const response = await request(app)
            .post('/books/134/comments')
            .send(
                {
                    comment: 'Any comment',
                }
            );

        expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
        expect(response.text).toStrictEqual('Book with given id does not exist.');
    });

    it.skip('adds comment to DB if valid data provided', async () => {
        const bookId = db.prepare(`INSERT INTO
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
            .run('Test title', '123-123', 'Test Author', 200, 3)
            .lastInsertRowid;

        const response = await request(app)
            .post(`/books/${bookId}/comments`)
            .send(
                {
                    comment: 'Any comment',
                }
            );

        expect(response.statusCode).toBe(StatusCodes.NO_CONTENT);
    });
});


