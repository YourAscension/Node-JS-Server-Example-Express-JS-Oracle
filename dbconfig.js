import oracledb from "oracledb";

const ORACLE_LOGIN = { user: "yourascension", password: process.env.NODE_ORACLEDB_PASSWORD || "123456", connectionString: "localhost/xe" };

export const pool = await oracledb.createPool(ORACLE_LOGIN);
