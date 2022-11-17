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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavingAccount = void 0;
const BankProcess_1 = require("./BankProcess");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const DbQueryController_1 = require("../DbHelper/DbQueryController");
let PROMPT = (0, prompt_sync_1.default)();
class SavingAccount extends BankProcess_1.BankProcess {
    constructor() {
        super();
        SavingAccount.savingAcc_DepositLimit = 50000;
        SavingAccount.savingAcc_WithdrawLimit = 25000;
    }
    //deposit process
    deposit(accountno) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ACCOUNT NO :    " + accountno);
            let depositAmount = Number(PROMPT("enter the deposit amount  :  "));
            if (yield this.checkDepositLimit(depositAmount, accountno)) {
                yield this.checkMyBalance(accountno);
                this.current_balance = this.current_balance + depositAmount;
                let query = "INSERT INTO customer_statement(account_no,deposit,current_balance)"
                    + "VALUES(" + accountno + "," + depositAmount + "," + this.current_balance + ");";
                yield (0, DbQueryController_1.executeQuery)(query);
                console.log("\t<<<<<<AFTER DEPOSIT :" + depositAmount + ">>>>>>\t");
                yield this.checkMyBalance(accountno);
            }
            else {
                console.log("Total Amount Of Today You Deposit :" + this.todayDep_Amount + "");
                console.log("\t<<<<<<Transaction Denied You reach the Today deposit limit" + SavingAccount.savingAcc_DepositLimit + ">>>>>\t");
            }
        });
    }
    //withdraw Process
    withdraw(accountno) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ACCOUNT NO :    " + accountno);
            let withdrawAmount = Number(PROMPT("enter the WithDraw Amount : "));
            if (yield this.checkWithdrawLimit(withdrawAmount, accountno)) {
                yield this.checkMyBalance(accountno);
                if (withdrawAmount <= this.current_balance) {
                    this.current_balance = this.current_balance - withdrawAmount;
                    let query = "INSERT INTO customer_statement(account_no,withdraw,current_balance)"
                        + "VALUES(" + accountno + "," + withdrawAmount + "," + this.current_balance + ");";
                    yield (0, DbQueryController_1.executeQuery)(query);
                    console.log("AFTER WITHDRAWN  :" + withdrawAmount + ">>>>>>\t");
                    yield this.checkMyBalance(accountno);
                }
                else {
                    console.log("------NOT ENOUGH MONEY! N YOUR ACCOUNT------");
                }
            }
            else {
                console.log("\tTotal Amount Of Today You withdrawn :" + this.todayWith_Amount);
                console.log("\t<<<<<<Transaction Denied You reach the Today Withdraw limit" + SavingAccount.savingAcc_WithdrawLimit + ">>>>>\t");
            }
        });
    }
    //checking deposit Limit
    checkDepositLimit(depositAmount, accountno) {
        return __awaiter(this, void 0, void 0, function* () {
            let allow = true;
            let query = "SELECT SUM(deposit) FROM customer_statement "
                + "Where account_no=" + accountno + " And date='" + this.getDate() + "'  GROUP BY  account_no, date;";
            let arrayresult = [];
            arrayresult = yield (0, DbQueryController_1.resultsetMetadata)(query);
            if (arrayresult.length > 0) {
                this.todayDep_Amount = Number((arrayresult[0]));
                if ((this.todayDep_Amount + depositAmount) > SavingAccount.savingAcc_DepositLimit) {
                    allow = false;
                }
            }
            else if (arrayresult.length <= 0) {
                if (depositAmount > SavingAccount.savingAcc_DepositLimit) {
                    allow = false;
                }
            }
            return allow;
        });
    }
    //checking withdraw Limit
    checkWithdrawLimit(withdrawAmount, accountno) {
        return __awaiter(this, void 0, void 0, function* () {
            let Allow = true;
            let query = "SELECT SUM(withdraw) FROM customer_statement "
                + "Where account_no=" + accountno + " And date='" + this.getDate() + "'  GROUP BY  account_no, date;";
            let arrayresult = [];
            arrayresult = yield (0, DbQueryController_1.resultsetMetadata)(query);
            //todayWith_Amount=Double.parseDouble(al.get(0));
            if (arrayresult.length > 0) {
                this.todayWith_Amount = Number(arrayresult[0]);
                if ((this.todayWith_Amount + withdrawAmount) > SavingAccount.savingAcc_WithdrawLimit) {
                    Allow = false;
                }
            }
            else if (arrayresult.length <= 0) {
                if (withdrawAmount > SavingAccount.savingAcc_WithdrawLimit) {
                    Allow = false;
                }
            }
            return Allow;
        });
    }
}
exports.SavingAccount = SavingAccount;
