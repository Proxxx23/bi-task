import * as dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import express from 'express';
import booksRouter from './routes/books';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.use('/books', booksRouter);

app.listen(3000, () => {
  console.log('Server running!');
});

export default app;
