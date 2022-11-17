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
exports.ManagerLogin = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const Account_1 = require("../Account/Account");
const Checking_1 = require("../Service/Checking");
const CustomerView_1 = require("../Customer/CustomerView");
const AccountView_1 = require("../Account/AccountView");
const PROMPT = (0, prompt_sync_1.default)();
class ManagerLogin {
    constructor() {
        this._managerUserName = PROMPT("enter the UserName  :  ");
        this._managerPassword = PROMPT("enter the Password  :  ");
    }
    //setter
    set managerUserName(managerUserName) { this._managerUserName = managerUserName; }
    set managerPassword(managerPassword) { this._managerPassword = managerPassword; }
    //getters	
    get managerUserName() { return this._managerUserName; }
    get managerPassword() { return this._managerPassword; }
    bankManagerOption() {
        return __awaiter(this, void 0, void 0, function* () {
            let flag = true;
            let account_no = 0;
            let accountobj = new Account_1.Account();
            while (flag) {
                console.log("\t\tCustomer  details             \tpress----->1");
                console.log("\t\tCustomer Account Statement    \tpress----->2");
                console.log("\t\tBACK                          \tpress----->0");
                let selection = PROMPT("enter your choice  :  ");
                if (selection !== "0") {
                    account_no = Number(PROMPT("Enter the Account No  :  "));
                    accountobj.accountno = account_no; //set account no;
                }
                switch (selection) {
                    case "1":
                        if (yield (0, Checking_1.checkCustomer_AccountNo)(accountobj.accountno)) {
                            yield (0, CustomerView_1.viewCustomerDetail)(accountobj.accountno);
                        }
                        else {
                            console.log("Account not found");
                        }
                        break;
                    case "2":
                        if (yield (0, Checking_1.checkCustomer_AccountNo)(accountobj.accountno)) {
                            yield (0, AccountView_1.showingAccountStatement)(accountobj.accountno);
                        }
                        else {
                            console.log("Account not found");
                        }
                        break;
                    case "0":
                        flag = false;
                        break;
                    default:
                        console.log("INVALID INPUT");
                        break;
                }
            }
        });
    }
}
exports.ManagerLogin = ManagerLogin;
