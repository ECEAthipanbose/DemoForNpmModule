"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const dbtable = __importStar(require("./DbHelper/TableCreationInDb"));
const DbConnection_1 = require("./DbHelper/DbConnection");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const User_1 = require("./Service/User");
const ManagerLogin_1 = require("./Service/ManagerLogin");
const Checking_1 = require("./Service/Checking");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const PROMPT = (0, prompt_sync_1.default)();
        let flag = true;
        yield dbtable.createDbTableTrigger(); //ct.createTableForPboi_Bank();
        while (flag) {
            console.log("----------------------------WELCOME TO Pboi Srivilliputtur Branch-----------------------------");
            console.log("\t USER            \tPRESS--------> 1\n");
            console.log("\t BANK MANAGER    \tPRESS--------> 2\n");
            console.log("\t EXIT            \tPRESS--------> 0\n");
            let selection = PROMPT('enter your choice  :'); //String selection =in.next();
            switch (selection) {
                case "1":
                    console.log("yes");
                    yield (0, User_1.user)();
                    break;
                case "2":
                    let ml = new ManagerLogin_1.ManagerLogin();
                    if (yield (0, Checking_1.checkManager_UserNamePass)(ml.managerUserName, ml.managerPassword)) {
                        yield ml.bankManagerOption();
                    }
                    else {
                        console.log("UN AUTHENTICATED PERSON (USERNAME PASSWORD IS INVALID");
                    }
                    break;
                case "0":
                    flag = false;
                    (0, DbConnection_1.closeConnection)();
                    break;
                default:
                    console.log("Invalid Selection");
                    break;
            }
        }
    });
}
start();
