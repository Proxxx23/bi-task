import fs from "fs";
import {resolve} from "path";
import Database from "better-sqlite3";

(function createBooksTable() {
  const db = new Database('production.db');

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
            'book_id' INTEGER NOT NULL REFERENCES books ON DELETE CASCADE,
            'comment' TEXT NOT NULL
        )`
  );

  db.pragma('foreign_keys = ON');

  fs.access(resolve('./db/production.db'), undefined, () => {
      // No DB yet
    fs.mkdir(resolve('./db'), {}, () => {
      fs.rename(resolve('./production.db'), resolve('./db/production.db'), () => {})
    });
  });
})();
