"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var mysqlseed_1 = require("mysqlseed");
var _a = process.env, DB_USER = _a.DB_USER, DB_PASS = _a.DB_PASS, DB_HOST = _a.DB_HOST, DB_PORT = _a.DB_PORT;
var config = {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: 'wind'
};
var connection = mysql_1.default.createConnection(config);
connection.connect();
var quoteTable = mysqlseed_1.createTableSeed(connection, 'quotes');
exports.quoteTable = quoteTable;
