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
exports.signInOption = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const Checking_1 = require("./Checking");
const Account_1 = require("../Account/Account");
const AccountView_1 = require("../Account/AccountView");
const CurrentAccount_1 = require("../Account/CurrentAccount");
const SavingAccount_1 = require("../Account/SavingAccount");
const CustomerView_1 = require("../Customer/CustomerView");
const PROMPT = (0, prompt_sync_1.default)();
function signInOption() {
    return __awaiter(this, void 0, void 0, function* () {
        let username = PROMPT("enter the UserName  :  ");
        let password = PROMPT("enter the Password  :  ");
        if (yield (0, Checking_1.checkCustomer_UserNamePass)(username, password)) {
            yield BankProcessOption(username, password);
        }
        else {
            console.log("USER NAME PASSWORD DOENT NOT MATCH");
        }
    });
}
exports.signInOption = signInOption;
function BankProcessOption(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let ac = new Account_1.Account();
        yield ac.setAccountNo_AccountTypeId(username, password);
        let obj = null;
        if (ac.accounttype_id == 1) {
            obj = new SavingAccount_1.SavingAccount();
            obj.setdate();
        }
        else if (ac.accounttype_id == 2) {
            obj = new CurrentAccount_1.CurrentAccount();
            obj.setdate();
        }
        let flag = true;
        while (flag) {
            console.log("\t\t<<<<SELECT OPTION>>>>\t\t");
            console.log("CHECK BALANCE      :        \tPRESS-------->1");
            console.log("DEPOSIT            :        \tPRESS-------->2");
            console.log("WITHDRAW           :        \tPRESS-------->3");
            console.log("Account Statement  :        \tPRESS-------->4");
            console.log("MY PROFILE         :        \tPRESS-------->5");
            console.log("BACK               :        \tPRESS-------->0");
            let selection = PROMPT("enter your choice !  :  ");
            switch (selection) {
                case "1":
                    yield obj.checkMyBalance(ac.accountno);
                    break;
                case "2":
                    yield obj.deposit(ac.accountno);
                    break;
                case "3":
                    yield obj.withdraw(ac.accountno);
                    break;
                case "4":
                    yield (0, AccountView_1.showingAccountStatement)(ac.accountno);
                    break;
                case "5":
                    yield (0, CustomerView_1.viewCustomerDetail)(ac.accountno);
                    break;
                case "0":
                    flag = false;
                    break;
                default:
                    console.log("Ivalid input :");
                    break;
            }
        }
    });
}
