import request from "supertest";
import {StatusCodes} from "http-status-codes";
import {createTestServer} from "../testServer";
import {databaseConnection} from "../infrastructure/db/connection";

// Fixme: connectivity problems with a test DB
describe('Endpoint to add comments', () => {
    const app = createTestServer();

    const {connection: commentsDb, dbTable: commentsTable} = databaseConnection('comments');
    const {connection: booksDb, dbTable: booksTable} = databaseConnection('books');

    beforeEach(() => commentsDb.exec('DELETE FROM ' + booksTable));
    afterAll(() => {
        commentsDb.exec('DELETE FROM ' + commentsTable);
        booksDb.exec('DELETE FROM ' + booksTable);
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
        const bookId = booksDb.prepare(`INSERT INTO
            ${booksTable}
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


