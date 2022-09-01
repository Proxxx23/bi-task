"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookFromRequest = void 0;
const Book_1 = require("../models/Book");
const createBookFromRequest = (request) => {
    return new Book_1.Book(request.title, request.isbn, request.pagesCount, request.rating);
};
exports.createBookFromRequest = createBookFromRequest;
//# sourceMappingURL=bookFactory.js.map