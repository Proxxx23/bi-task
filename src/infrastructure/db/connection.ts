import Database from "better-sqlite3";

export const databaseConnection = () => {
    const dbName = process.env.NODE_ENV === 'production'
        ? process.env.PROD_DB_NAME
        : process.env.TEST_DB_NAME;

    const connection = new Database(__dirname + '/../../../db/' + dbName, {
        fileMustExist: true
    });

    const dbTable = dbName.replace('.db', '');

    return {
        connection,
        dbName,
        dbTable,
    };
}
