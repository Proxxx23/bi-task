import request from "supertest";
import {StatusCodes} from "http-status-codes";
import {createTestServer} from "../testServer";
import {databaseConnection} from "../infrastructure/db/connection";

describe('Endpoint to remove books', () => {
    const app = createTestServer();

    const {connection: db, dbTable} = databaseConnection('books');

    beforeEach(() => db.exec('DELETE FROM ' + dbTable));
    afterAll(() => db.exec('DELETE FROM ' + dbTable));

    it('responds with 404 code if book with given id not found in DB', async () => {
        const response = await request(app)
            .delete('/145')
            .send();

        expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
    });

    it('removes book from DB and responds with 200 code if book is stored in DB', async () => {
        const stmt = db.prepare(`INSERT INTO
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
            .run('Test title', '123-123', 'Test Author', 200, 3);
        const response = await request(app)
            .delete(`/${stmt.lastInsertRowid}`)
            .send();

        expect(response.statusCode).toBe(StatusCodes.NO_CONTENT);

        const dbCheck = db.prepare(`SELECT * FROM ${dbTable} WHERE id = ?`).get(stmt.lastInsertRowid);
        expect(dbCheck).toBeUndefined();
    });
});
