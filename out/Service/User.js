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
exports.user = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const UserSignUp_1 = require("../Service/UserSignUp");
const UserSignIn_1 = require("../Service/UserSignIn");
function user() {
    return __awaiter(this, void 0, void 0, function* () {
        let flag = true;
        while (flag) {
            console.log("\t\t <<<<<<<<<USER PAGE>>>>>>>>>>>>\n");
            console.log("(SIGN UP)                      \tPRESS------> 1\n");
            console.log("(SIGN IN)                      \tPRESS------> 2\n");
            console.log("LOGOUT                         \tPRESS------> 3\n");
            const PROMPT = (0, prompt_sync_1.default)();
            let selection = PROMPT('enter your choic ! : ');
            switch (selection) {
                case "1":
                    yield (0, UserSignUp_1.userSignUp)();
                    break;
                case "2":
                    yield (0, UserSignIn_1.signInOption)();
                    break;
                case "3":
                    flag = false;
                    console.log("\"\\t<<<<<THANK YOU !  MEET YOU NEXT TIME\\t>>>>> \"");
                    break;
                default:
                    console.log("Invalid input ");
                    break;
            }
        }
    });
}
exports.user = user;
