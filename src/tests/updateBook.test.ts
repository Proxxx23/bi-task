import request from "supertest";
import {StatusCodes} from "http-status-codes";
import {createTestServer} from "../testServer";
import {databaseConnection} from "../infrastructure/db/connection";

type errorResp = {
    errors: {
        msg: string,
    }[]
};

describe('Endpoint to update books', () => {
    const app = createTestServer();

    const {connection: db, dbTable} = databaseConnection('books');

    beforeEach(() => db.exec('DELETE FROM ' + dbTable));
    afterEach(() => db.exec('DELETE FROM ' + dbTable));

    it('responds with 404 code if book with given id does not exist in DB', async () => {
        const response = await request(app)
            .patch('/123')
            .send(
                {
                    title: 'Any title',
                    isbn: '978-83-962-7331-4',
                    author: 'Any author',
                    pagesCount: 100,
                    rating: 1
                }
            );

        expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
        expect(response.text).toStrictEqual('Book with given id not found.');
    });

    it('Validation: responds with 422 code if title is too long', async () => {
        const bookId = db.prepare(`INSERT INTO
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
            .run('Test title', '123-123', 'Test Author', 200, 3)
            .lastInsertRowid;

        const response = await request(app)
            .patch('/' + bookId)
            .send(
                {
                    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in volutpat risus, sodales tincidunt risus. Phasellus nec nisl eget sem aliquam mollis. Donec aliquam varius nisi non lobortis. Fusce quis pretium lorem. Pellentesque nulla lacus, placerat eu tincidunt vel, egestas vel arcu. Integer quis efficitur lectus. Morbi id sem risus. Ut ac eros non augue scelerisque faucibus. Morbi sed magna vehicula, mollis elit luctus, lacinia nibh. Maecenas ac lectus vel diam congue eleifend sed eu dui. Pellentesque maximus ultricies diam, ut facilisis purus aliquet faucibus.\n' +
                        '\n' +
                        'Nulla ut eleifend justo. Cras tincidunt placerat dapibus. Integer non viverra mi, at euismod dolor. Fusce suscipit aliquam leo, non bibendum felis mollis quis. Suspendisse sit amet augue quam. Vestibulum luctus massa eu aliquam dignissim. Fusce luctus ante lectus. Sed vel egestas lorem. Phasellus ut augue ac ex lacinia gravida et ut dolor.\n' +
                        '\n' +
                        'Proin enim velit, finibus sed odio nec, pellentesque volutpat tortor. Quisque non dui a purus lacinia sagittis et ut neque. Vivamus commodo semper felis, eget venenatis ex consectetur efficitur. Proin diam magna, condimentum sed magna et, dapibus pulvinar ligula. Phasellus rhoncus orci sed ornare interdum. In semper enim quis mi tempor, ornare tincidunt est luctus. Sed tincidunt, ante vitae congue rutrum, elit enim fermentum lorem, eget elementum arcu mi sed purus. Ut vel tristique ipsum. Nunc turpis dolor, molestie eu urna a, condimentum tristique nulla. Praesent eget dapibus mi. Nunc mattis aliquet enim sit amet dictum. Vivamus diam justo, volutpat sit amet quam eget, porta pellentesque sem. In eu orci quis urna malesuada sollicitudin. Etiam sollicitudin a elit consequat commodo. Curabitur non hendrerit purus, a malesuada nisi. Fusce elementum, lectus non ornare.',
                    isbn: '978-83-962-7331-4',
                    author: 'Any author',
                    pagesCount: 100,
                    rating: 1
                }
            );

        expect(response.statusCode).toBe(StatusCodes.UNPROCESSABLE_ENTITY);

        const resp = JSON.parse(response.text) as errorResp;
        expect(resp.errors[0].msg).toStrictEqual('Book title must be a string of length between 1 and 255 characters!');
    })

    it('Validation: responds with 422 code if authors field is too long', async () => {
        const bookId = db.prepare(`INSERT INTO
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
            .run('Test title', '123-123', 'Test Author', 200, 3)
            .lastInsertRowid;

        const response = await request(app)
            .patch('/' + bookId)
            .send(
                {
                    title: 'Any title',
                    isbn: '978-83-962-7331-4',
                    author: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam justo nulla, pretium sed arcu vel, posuere viverra risus. Vivamus viverra quam sit amet vulputate euismod. Mauris interdum feugiat turpis, non elementum mauris porta id. Nulla laoreet congue tincidunt. Ut non efficitur sapien. Maecenas efficitur volutpat finibus. Aenean rutrum ipsum ac.',
                    pagesCount: 100,
                    rating: 1
                }
            );

        expect(response.statusCode).toBe(StatusCodes.UNPROCESSABLE_ENTITY);

        const resp = JSON.parse(response.text) as errorResp;
        expect(resp.errors[0].msg).toStrictEqual('Book author(s) must be a string of length between 1 and 50 characters!');
    })

    it('Validation: responds with 422 code if ISBN has wrong format', async () => {
        const bookId = db.prepare(`INSERT INTO
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
            .run('Test title', '123-123', 'Test Author', 200, 3)
            .lastInsertRowid;

        const response = await request(app)
            .patch('/' + bookId)
            .send(
                {
                    title: 'Any title',
                    isbn: '123-456',
                    author: 'Any author',
                    pagesCount: 100,
                    rating: 1
                }
            );

        expect(response.statusCode).toBe(StatusCodes.UNPROCESSABLE_ENTITY);

        const resp = JSON.parse(response.text) as errorResp;
        expect(resp.errors[0].msg).toStrictEqual('Invalid ISBN format!');
    })

    it('Validation: responds with 422 code if pages count is greater than allowed 9999 pages', async () => {
        const bookId = db.prepare(`INSERT INTO
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
            .run('Test title', '123-123', 'Test Author', 200, 3)
            .lastInsertRowid;

        const response = await request(app)
            .patch('/' + bookId)
            .send(
                {
                    title: 'Any title',
                    isbn: '978-83-962-7331-4',
                    author: 'Any author',
                    pagesCount: 10000,
                    rating: 1
                }
            );

        expect(response.statusCode).toBe(StatusCodes.UNPROCESSABLE_ENTITY);

        const resp = JSON.parse(response.text) as errorResp;
        expect(resp.errors[0].msg).toStrictEqual('Pages count must be a numeric value within 1 and 9999 range');
    })

    it('Validation: responds with 422 code if rating is not between allowed values (1 to 5)', async () => {
        const bookId = db.prepare(`INSERT INTO
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
            .run('Test title', '123-123', 'Test Author', 200, 3)
            .lastInsertRowid;

        const response = await request(app)
            .patch('/' + bookId)
            .send(
                {
                    title: 'Any title',
                    isbn: '978-83-962-7331-4',
                    author: 'Any author',
                    pagesCount: 300,
                    rating: 6
                }
            );

        expect(response.statusCode).toBe(StatusCodes.UNPROCESSABLE_ENTITY);

        const resp = JSON.parse(response.text) as errorResp;

        expect(resp.errors[0].msg).toStrictEqual('Rating must be a numeric value within 1 and 5 range');
    })

    it('Updates book in DB if all fields are valid and returns 204 status code', async () => {
        const bookId = db.prepare(`INSERT INTO
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
            .run('Test title', '123-123', 'Test Author', 200, 3)
            .lastInsertRowid;

        const response = await request(app)
            .patch('/' + bookId)
            .send(
                {
                    title: 'Any title',
                    isbn: '978-83-962-7331-4',
                    author: 'Any author',
                    pagesCount: 300,
                    rating: 5
                }
            );

        expect(response.statusCode).toBe(StatusCodes.NO_CONTENT);
    })
});


