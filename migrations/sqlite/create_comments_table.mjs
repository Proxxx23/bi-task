import fs from "fs";
import {resolve} from "path";
import Database from "better-sqlite3";

(function createCommentsTable() {
  const db = new Database('comments.db');

  // todo: better sqlite has problems with FOREIGN KEYS, resulting querying for comments in: SqliteError: no such table: main.books
  db.exec(
    `CREATE TABLE IF NOT EXISTS
            comments
        (
            'id' INTEGER PRIMARY KEY AUTOINCREMENT,
            'book_id' INTEGER NOT NULL,
            'comment' TEXT NOT NULL
        )`
  );

  fs.access(resolve('./db/comments.db'), undefined, () => {
    fs.rename(resolve('./comments.db'), resolve('./db/comments.db'), () => {});
  });
})();
