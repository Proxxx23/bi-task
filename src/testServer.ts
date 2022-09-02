import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import booksRouter from "./routes/books";

export const createTestServer = () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use('/', booksRouter);

    process.env.NODE_ENV = 'test';

    return app;
}
