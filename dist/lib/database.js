"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlConnection = void 0;
const mysql_1 = __importDefault(require("mysql"));
const mysqlConnection = () => {
    return new Promise((resolve, reject) => {
        const connection = mysql_1.default.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "password",
            database: "revou"
        });
        connection.connect((err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(connection);
        });
    });
};
exports.mysqlConnection = mysqlConnection;
