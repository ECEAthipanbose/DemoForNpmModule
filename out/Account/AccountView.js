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
exports.showingAccountStatement = void 0;
const DbQueryController_1 = require("../Helper/DbQueryController");
function showingAccountStatement(accountno) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = "SELECT date,account_no,deposit,withdraw FROM customer_statement WHERE account_no=" + accountno + ";";
        let arrayresult = yield (0, DbQueryController_1.resultsetMetadata)(query);
        if (arrayresult.length > 0) {
            let count = -1;
            while (count < (arrayresult.length - 1)) //<12
             {
                console.log("\t\t<<<<<<<< DATE :" + arrayresult[++count] + " >>>>>>>>"); //0 4 8
                console.log("\t\tAccount No       :" + arrayresult[++count]); //1 5 9 
                console.log("\t\tDEPOSIT AMOUNT   :" + arrayresult[++count]); //2 6 10
                console.log("\t\tWITHDRAW AMOUNT  :" + arrayresult[++count]); //3 7 11
                console.log("\n");
            }
        }
        else {
            console.log("Transaction did not Take Place !");
        }
    });
}
exports.showingAccountStatement = showingAccountStatement;
