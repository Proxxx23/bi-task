import fs from "fs";
import {resolve} from "path";
import Database from "better-sqlite3";

(function createBooksRepository() {
  const db = new Database('comments_test.db');

  // fixme: async exec!
  db.exec(
    `CREATE TABLE IF NOT EXISTS
            comments_test
        (
            'id' INTEGER PRIMARY KEY AUTOINCREMENT,
            'book_id' INTEGER NOT NULL REFERENCES books_test,
            'comment' TEXT NOT NULL
        )`
  );

  db.pragma('foreign_keys = ON');

  fs.access(resolve('./db/comments_test.db'), undefined, () => {
      // No DB yet
    fs.mkdir(resolve('./db'), {}, () => {});
    fs.rename(resolve('./comments_test.db'), resolve('./db/comments_test.db'), () => {});
  });
})();
