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
exports.createUserNamePassword = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const DbQueryController_1 = require("../DbHelper/DbQueryController");
const Checking_1 = require("./Checking");
const PROMPT = (0, prompt_sync_1.default)();
function createUserNamePassword() {
    return __awaiter(this, void 0, void 0, function* () {
        let query;
        console.log("\t<<<<CREATE USERNAME PASSWORD >>>>");
        let username = PROMPT('enter the user name : ');
        let password = PROMPT("enter the password : ");
        let acc_no = Number(PROMPT("enter the account number : "));
        if (yield (0, Checking_1.checkCustomer_AlreadySignIn)(acc_no)) //checking already sign in or not
         {
            if (yield (0, Checking_1.checkCustomer_AccountNo)(acc_no)) //checking account no in bank if not sign in
             {
                query = "INSERT INTO customer_login(cus_user_name,cus_password,account_no)"
                    + "VALUES('" + username + "','" + password + "'," + acc_no + ");";
                yield (0, DbQueryController_1.executeQuery)(query);
                console.log("\t------------------ CREATE USER NAME PASSWOR SUCESSFULLY-------------");
            }
            else {
                console.log("Wrong Account no");
            }
        }
    });
}
exports.createUserNamePassword = createUserNamePassword;
