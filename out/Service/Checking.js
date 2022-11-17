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
exports.checkManager_UserNamePass = exports.checkCustomer_UserNamePass = exports.checkCustomer_AccountNo = exports.checkCustomer_AlreadySignIn = void 0;
const DbQueryController_1 = require("../Helper/DbQueryController");
function checkCustomer_AlreadySignIn(accountno) {
    return __awaiter(this, void 0, void 0, function* () {
        let allow = true;
        let arrayList = [];
        let query = '';
        query = "SELECT * FROM customer_login WHERE account_no=" + accountno + ";";
        arrayList = yield (0, DbQueryController_1.resultsetMetadata)(query);
        if (arrayList.length > 0) {
            console.log("You are already Sign in");
            allow = false;
        }
        return allow;
    });
}
exports.checkCustomer_AlreadySignIn = checkCustomer_AlreadySignIn;
function checkCustomer_AccountNo(acc_no) {
    return __awaiter(this, void 0, void 0, function* () {
        let allow = false;
        let arrayList = [];
        let query = '';
        query = "SELECT * FROM account_details WHERE account_no=" + acc_no + ";";
        arrayList = yield (0, DbQueryController_1.resultsetMetadata)(query);
        if (arrayList.length > 0) {
            allow = true;
        }
        return allow;
    });
}
exports.checkCustomer_AccountNo = checkCustomer_AccountNo;
function checkCustomer_UserNamePass(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let allow = false;
        let arrayList = [];
        let query = '';
        query = "SELECT * FROM customer_login WHERE cus_user_name="
            + "'" + username + "' AND cus_password='" + password + "';";
        arrayList = yield (0, DbQueryController_1.resultsetMetadata)(query);
        if (arrayList.length > 0) {
            allow = true;
        }
        return allow;
    });
}
exports.checkCustomer_UserNamePass = checkCustomer_UserNamePass;
function checkManager_UserNamePass(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let allow = false;
        let arrayList = [];
        let query = '';
        query = "SELECT * FROM manager_login WHERE manager_username="
            + "'" + username + "' AND manager_password='" + password + "';";
        arrayList = yield (0, DbQueryController_1.resultsetMetadata)(query);
        if (arrayList.length > 0) {
            allow = true;
        }
        return allow;
    });
}
exports.checkManager_UserNamePass = checkManager_UserNamePass;
// }
