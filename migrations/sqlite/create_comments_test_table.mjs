import fs from "fs";
import {resolve} from "path";
import Database from "better-sqlite3";

(function createCommentsTestTable() {
  const db = new Database('comments_test.db');

  // todo: better sqlite has problems with FOREIGN KEYS, resulting querying for comments in: SqliteError: no such table: main.books
  db.exec(
    `CREATE TABLE IF NOT EXISTS
            comments_test
        (
            'id' INTEGER PRIMARY KEY AUTOINCREMENT,
            'book_id' INTEGER NOT NULL,
            'comment' TEXT NOT NULL
        )`
  );

  db.pragma('foreign_keys = ON');

  fs.access(resolve('./db/comments_test.db'), undefined, () => {
    fs.rename(resolve('./comments_test.db'), resolve('./db/comments_test.db'), () => {});
  });
})();
