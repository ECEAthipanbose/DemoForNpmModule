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
exports.BankProcess = void 0;
const DbQueryController_1 = require("../DbHelper/DbQueryController");
class BankProcess {
    constructor() {
        this.date = '';
        this.current_balance = 0;
        this.todayDep_Amount = 0;
        this.todayWith_Amount = 0;
    }
    setdate() {
        let dt = new Date();
        let todaydate = ("0" + dt.getDate()).slice(-2);
        let year = dt.getFullYear();
        let month = ("0" + (dt.getMonth() + 1)).slice(-2);
        this.date = `${year}-${month}-${todaydate}`;
    }
    getDate() { return this.date; }
    //checking balance
    checkMyBalance(accountno) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ACCOUNT NO :\t" + accountno);
            let query = "SELECT current_balance FROM customer_statement WHERE account_no="
                + accountno + "ORDER BY statement_id DESC LIMIT 1;";
            let arrayresult;
            arrayresult = yield (0, DbQueryController_1.resultsetMetadata)(query);
            if (arrayresult.length > 0) {
                this.current_balance = Number(arrayresult[0]);
                console.log("CURRENT BALANCE :" + this.current_balance);
            }
            else {
                console.log("CURRENT BALANCE :" + this.current_balance);
            }
        });
    }
}
exports.BankProcess = BankProcess;
