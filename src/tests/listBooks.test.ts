import request from "supertest";
import {StatusCodes} from "http-status-codes";
import {createTestServer} from "../testServer";
import {databaseConnection} from "../infrastructure/sqlite/connection";

describe('Endpoint to list books', () => {
    const app = createTestServer();
    const db = databaseConnection();

    beforeEach(() => db.exec('DELETE FROM books'));
    afterAll(() => db.exec('DELETE FROM books'));

    it('responds with 200 code and empty data if no books stored in DB', async () => {
        const response = await request(app)
            .get('/')
            .send();

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response.body).toStrictEqual([]);
    });

    it('responds with 200 code and valid data if any book stored in DB', async () => {
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
            .get('/')
            .send();

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response.body).toStrictEqual(
            [
                {
                    id: bookId,
                    title: 'Test title',
                    isbn: '123-123',
                    author: 'Test Author',
                    pages_count: 200,
                    rating: 3,
                    last_comments: []
                }
            ]
        );
    });

    it('responds with 200 code and valid data with limit to 3 books to show', async () => {
        for (let i = 0; i < 10; i++) {
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
                .run('Test title ' + i, '123-123-' + i, 'Test Author ' + i, 200, 3);
        }

        const response = await request(app)
            .get('/')
            .query({perPage: 3})
            .send();

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(response.body.length).toBe(3);
    });
});
