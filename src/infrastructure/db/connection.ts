import Database from "better-sqlite3";

export const databaseConnection = () => {
    const dbFile = `${process.env.NODE_ENV}.db`;

    return new Database(__dirname + `/../../../db/${dbFile}`, {
        fileMustExist: true,
    });
}
