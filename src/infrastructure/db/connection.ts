import Database from "better-sqlite3";

export const databaseConnection = (name: string) => {
    const dbName = process.env.NODE_ENV === 'production'
        ? name + '.db'
        : name + '_test.db';

    const connection = new Database(__dirname + '/../../../db/' + dbName, {
        fileMustExist: true,
    });

    const dbTable = dbName.replace('.db', '');

    return {
        connection,
        dbName,
        dbTable,
    };
}
