"use strict";
// package com.zoho.pboiBank;
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
exports.Account = void 0;
// import java.util.ArrayList;
const DbQueryController_1 = require("../Helper/DbQueryController");
class Account {
    //setter
    set accountno(accountno) {
        this._accountno = accountno;
    }
    set accounttype_id(accounttype_id) {
        this._accounttype_id = accounttype_id;
    }
    // 	//getters
    get accountno() {
        return this._accountno;
    }
    get accounttype_id() {
        return this._accounttype_id;
    }
    setAccountNo_AccountTypeId(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let arrayresult = [];
            let query = '';
            query = "SELECT customer_login.account_no,acc_type_id FROM customer_login  INNER JOIN account_details ON customer_login.account_no=account_details.account_no WHERE cus_user_name='" +
                username + "'AND cus_password='" + password + "';";
            arrayresult = yield (0, DbQueryController_1.resultsetMetadata)(query);
            if (arrayresult.length > 0) {
                this._accountno = Number((arrayresult[0]));
                this._accounttype_id = Number((arrayresult[1]));
            }
            else {
                console.log("not found");
            }
        });
    }
}
exports.Account = Account;
