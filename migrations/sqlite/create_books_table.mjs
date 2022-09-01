import fs from "fs";
import {resolve} from "path";
import Database from "better-sqlite3";

(function createBooksRepository() {
  const db = new Database('books.sqlite');

  db.exec(
    `CREATE TABLE IF NOT EXISTS
            books
        (
            id INTEGER PRIMARY KEY,
            uuid TEXT NOT NULL,
            title TEXT NOT NULL,
            isbn TEXT NOT NULL,
            pages INTEGER NOT NULL,
            rating INTEGER NOT NULL
        )`
  );

  fs.access(resolve('./db/books.sqlite'), undefined, () => {
      // No DB yet
    fs.mkdir(resolve('./db'), {}, () => {});
    fs.rename(resolve('./books.sqlite'), resolve('./db/books.sqlite'), () => {});
  });
})();
