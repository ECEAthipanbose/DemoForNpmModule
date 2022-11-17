"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeConnection = exports.pool = void 0;
const pg_1 = require("pg");
const credential = {
    user: 'postgres',
    host: 'localhost',
    database: 'bankaccountmanagement',
    password: 'athipan-16010',
    port: 5432,
};
exports.pool = new pg_1.Pool(credential);
function closeConnection() {
    exports.pool.end();
    console.log("ThankYou!!");
}
exports.closeConnection = closeConnection;
