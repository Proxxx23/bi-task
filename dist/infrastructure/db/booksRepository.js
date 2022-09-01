"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBooksRepository = void 0;
const tslib_1 = require("tslib");
const better_sqlite3_1 = tslib_1.__importDefault(require("better-sqlite3"));
const createBooksRepository = () => booksRepository();
exports.createBooksRepository = createBooksRepository;
const db = new better_sqlite3_1.default(__dirname + '/../../../db/books.sqlite', {
    fileMustExist: true
});
function booksRepository() {
    function all(limit, offset) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // todo: create DB DTO object
            return db.prepare(`SELECT * FROM books LIMIT ? OFFSET ?`)
                .run(limit, offset);
        });
    }
    function findByUuid(bookId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // todo: create DB DTO object
            return db.prepare(`SELECT * FROM books where uuid = ?`)
                .run(bookId);
        });
    }
    function add(book) {
        db.exec(`INSERT INTO
        books
            (
                title,
                isbn,
                pagesCount,
                rating,
            )
        VALUES
            (
                ${book.title},
                ${book.isbn},
                ${book.pagesCount},
                ${book.rating},
            )`);
    }
    function remove(bookId) {
        db.prepare('DELETE FROM books WHERE uuid = ?')
            .run(bookId);
    }
    return {
        all,
        findByUuid,
        add,
        remove
    };
}
//# sourceMappingURL=booksRepository.js.map