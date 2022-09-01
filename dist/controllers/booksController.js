"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.create = exports.index = void 0;
const tslib_1 = require("tslib");
const booksRepository_1 = require("../infrastructure/db/booksRepository");
const http_status_codes_1 = require("http-status-codes");
const bookFactory_1 = require("../factories/bookFactory");
const repository = (0, booksRepository_1.createBooksRepository)();
const index = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return res.json(repository.all(req.query.limit, req.query.offset));
});
exports.index = index;
const create = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const book = (0, bookFactory_1.createBookFromRequest)(req.body);
    const moviesRepository = (0, booksRepository_1.createBooksRepository)();
    try {
        yield moviesRepository.add(book);
        return res.send({
            data: book
        });
    }
    catch (err) {
        if (err instanceof Error) {
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send(err.message);
        }
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send('Internal error - movie not added!');
    }
});
exports.create = create;
const destroy = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.query.bookId;
    const book = repository.findByUuid(bookId);
    if (!book) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send('Book with given id not found.');
    }
    try {
        repository.remove(req.query.bookId);
    }
    catch (err) {
        return res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
    return res.sendStatus(http_status_codes_1.StatusCodes.OK);
});
exports.destroy = destroy;
//# sourceMappingURL=booksController.js.map