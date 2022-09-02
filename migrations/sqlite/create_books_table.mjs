import fs from "fs";
import {resolve} from "path";
import Database from "better-sqlite3";

(function createBooksRepository() {
  const db = new Database('books.db');

  // fixme: async exec!
  db.exec(
    `CREATE TABLE IF NOT EXISTS
            books
        (
            'id' INTEGER PRIMARY KEY,
            'title' TEXT NOT NULL,
            'isbn' TEXT NOT NULL,
            'author' TEXT NOT NULL,
            'pages_count' INTEGER NOT NULL,
            'rating' INTEGER NOT NULL
        )`
  );

  fs.access(resolve('./db/books.db'), undefined, () => {
      // No DB yet
    fs.mkdir(resolve('./db'), {}, () => {});
    fs.rename(resolve('./books.db'), resolve('./db/books.db'), () => {});
  });
})();
