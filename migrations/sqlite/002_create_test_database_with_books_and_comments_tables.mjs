import fs from "fs";
import {resolve} from "path";
import Database from "better-sqlite3";

(function createBooksTestTable() {
  const db = new Database('test.db');

  db.exec(
    `CREATE TABLE IF NOT EXISTS
            books
        (
            'id' INTEGER PRIMARY KEY AUTOINCREMENT,
            'title' TEXT NOT NULL,
            'isbn' TEXT NOT NULL,
            'author' TEXT NOT NULL,
            'pages_count' INTEGER NOT NULL,
            'rating' INTEGER NOT NULL
        )`
  );

  db.exec(
    `CREATE TABLE IF NOT EXISTS
            comments
        (
            'id' INTEGER PRIMARY KEY AUTOINCREMENT,
            'book_id' INTEGER NOT NULL REFERENCES books_test ON DELETE CASCADE,
            'comment' TEXT NOT NULL
        )`
  );

  db.pragma('foreign_keys = ON');

  fs.access(resolve('./db/test.db'), undefined, () => {
    fs.rename(resolve('./test.db'), resolve('./db/test.db'), () => {});
  });
})();
