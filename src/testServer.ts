import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import routes from "./routes/books";

export const createTestServer = () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use('/', routes);

    process.env.NODE_ENV = 'test';

    return app;
}
