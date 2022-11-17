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
exports.userSignUp = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const CreateUserNamePassword_1 = require("./CreateUserNamePassword");
const CreateBankAccount_1 = require("./CreateBankAccount");
const PROMPT = (0, prompt_sync_1.default)();
function userSignUp() {
    return __awaiter(this, void 0, void 0, function* () {
        let flag = true;
        while (flag) {
            console.log("CREATE NEW      PBI ACCOUNT :\t PRESS--------->1");
            console.log("ALREADY HAVE AN PBI ACCOUNT :\t PRESS--------->2");
            console.log("BACK                        :\t PRESS--------->3");
            let choice = PROMPT("enter the your choice : ");
            switch (choice) {
                case "1":
                    yield (0, CreateBankAccount_1.pboiAccountCreate)();
                    yield (0, CreateUserNamePassword_1.createUserNamePassword)();
                    break;
                case "2":
                    yield (0, CreateUserNamePassword_1.createUserNamePassword)();
                    break;
                case "3":
                    flag = false;
                    break;
                default:
                    console.log("Invalid input Try Again!");
                    break;
            }
        }
    });
}
exports.userSignUp = userSignUp;
