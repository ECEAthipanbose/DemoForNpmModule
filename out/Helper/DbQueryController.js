"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resultsetMetadata = exports.executeQuery = void 0;
const DbConnection_1 = require("./DbConnection");
function executeQuery(query, values) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield DbConnection_1.pool.connect();
        try {
            if (values === undefined) {
                const res = yield client.query(query);
            }
            else {
                const res = yield client.query(query, values);
            }
        }
        catch (err) {
            console.log(err);
        }
        finally {
            client.release();
        }
    });
}
exports.executeQuery = executeQuery;
function resultsetMetadata(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield DbConnection_1.pool.connect();
        let arr = [];
        let count = 0;
        let transferArray = [];
        try {
            const res = yield client.query(query);
            arr = res.fields.map(field => field.name); // ['first_name', 'last_name']
            let resultobject = res.rows;
            let count = resultobject.length - 1;
            for (let j = 0; j <= count; j++) {
                for (let i = 0; i < arr.length; i++) {
                    let tempobj = resultobject[j];
                    transferArray.push(tempobj[arr[i]]);
                }
            }
        }
        catch (err) {
            console.log(err);
        }
        finally {
            client.release();
        }
        return transferArray;
    });
}
exports.resultsetMetadata = resultsetMetadata;
