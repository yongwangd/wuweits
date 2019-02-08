import mysql from 'mysql';
import { createTableSeed } from 'mysqlseed';

const { DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;

const config: any = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASS,
  database: 'wind'
};

const connection = mysql.createConnection(config);

connection.connect();

const quoteTable = createTableSeed(connection, 'quotes');

export { quoteTable };
