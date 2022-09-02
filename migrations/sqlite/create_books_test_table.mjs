import fs from "fs";
import {resolve} from "path";
import Database from "better-sqlite3";

(function createBooksTestTable() {
  const db = new Database('books_test.db');

  db.exec(
    `CREATE TABLE IF NOT EXISTS
            books_test
        (
            'id' INTEGER PRIMARY KEY AUTOINCREMENT,
            'title' TEXT NOT NULL,
            'isbn' TEXT NOT NULL,
            'author' TEXT NOT NULL,
            'pages_count' INTEGER NOT NULL,
            'rating' INTEGER NOT NULL
        )`
  );

  fs.access(resolve('./db/books_test.db'), undefined, () => {
    fs.rename(resolve('./books_test.db'), resolve('./db/books_test.db'), () => {});
  });
})();
