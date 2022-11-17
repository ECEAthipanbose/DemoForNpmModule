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
exports.pboiAccountCreate = void 0;
const Customer_1 = require("../Customer/Customer");
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const CustomerDetailValidation_1 = require("../Customer/CustomerDetailValidation");
const DbQueryController_1 = require("../Helper/DbQueryController");
const PROMPT = (0, prompt_sync_1.default)();
let custobj;
function pboiAccountCreate() {
    return __awaiter(this, void 0, void 0, function* () {
        let query;
        let values = [];
        let cus_id = 0;
        let resultarr = []; //ArrayList<String> result;
        custobj = new Customer_1.Customer();
        getCustomerInput();
        query = 'INSERT INTO customerdetail(customer_name,customer_type)VALUES($1,$2) RETURNING *';
        values = [custobj.customerName, custobj.customertype];
        yield (0, DbQueryController_1.executeQuery)(query, values);
        query = "SELECT customer_id FROM customerdetail ORDER BY customer_id DESC LIMIT 1";
        resultarr = yield (0, DbQueryController_1.resultsetMetadata)(query);
        cus_id = resultarr[0];
        insertDetailByAccountType(cus_id);
        query = "SELECT acc_type_id FROM account_type WHERE acc_type='" + custobj.accType + "';";
        resultarr = yield (0, DbQueryController_1.resultsetMetadata)(query);
        custobj.acc_type_id = resultarr[0];
        query = "INSERT INTO account_details(acc_type_id,customer_id,status)VALUES(" + custobj.acc_type_id + "," + cus_id + ",'" + custobj.status + "');";
        yield (0, DbQueryController_1.executeQuery)(query);
        yield message(cus_id);
    });
}
exports.pboiAccountCreate = pboiAccountCreate;
function insertDetailByAccountType(cus_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let query;
        if (custobj.accType === "saving") {
            query = "INSERT INTO personaltypecustomer_details(date_of_birth , gender , customer_address , adharcard_no , customer_email , contact_no , city , district , state ,customer_id)"
                + "VALUES('" + custobj.dateOfBirth + "','" + custobj.gender + "','" + custobj.address + "'," + custobj.adhar_no + ",'" + custobj.emailid + "'," + custobj.mobileno + ",'" + custobj.city + "','" + custobj.district + "','" + custobj.state + "'," + cus_id + ");";
            yield (0, DbQueryController_1.executeQuery)(query);
        }
        else if (custobj.accType === "current") {
            query = "INSERT INTO companytypecustomer(nature_of_buisness, company_address, company_pan_no , company_email , contact_no , city , district , state ,customer_id)"
                + "VALUES('" + custobj.nature_of_buisness + "','" + custobj.address + "','" + custobj.pan_no + "','" + custobj.emailid + "'," + custobj.mobileno + ",'" + custobj.city + "','" + custobj.district + "','" + custobj.state + "'," + cus_id + ");";
            yield (0, DbQueryController_1.executeQuery)(query);
        }
    });
}
function getCustomerInput() {
    return __awaiter(this, void 0, void 0, function* () {
        let flag = true;
        while (flag) {
            console.log("enter the Account type     :\t\n\t Saving Account  Press---->1\n\t Current Account  Press----->2");
            //int i=Integer.parseInt(br.readLine());
            let choice = PROMPT('enter your choice : ');
            switch (choice) {
                case "2":
                    customerDetails("current");
                    flag = false;
                    break;
                case "1":
                    customerDetails("saving");
                    flag = false;
                    break;
                default:
                    console.log("Enter the ValiD no:");
                    break;
            }
        }
    });
}
function customerDetails(accountType) {
    return __awaiter(this, void 0, void 0, function* () {
        if (accountType === "saving") {
            savingCustomerDetails();
        }
        else if (accountType === "current") {
            currentCustomerDetails();
        }
    });
}
function savingCustomerDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        let value;
        let flag = true;
        let input = 0;
        custobj.customertype = "personal"; //setter
        custobj.accType = "saving";
        value = PROMPT("enter the name     :\t");
        custobj.customerName = value;
        while (flag) {
            value = PROMPT("enter the Date Of Birth (YYYY-MM-DD)   :");
            flag = (0, CustomerDetailValidation_1.checkDateOfBirthFormat)(value);
        }
        custobj.dateOfBirth = value;
        flag = true; //reset the flag
        while (flag) {
            value = PROMPT("Enter the Gender : ");
            flag = (0, CustomerDetailValidation_1.checkGender)(value);
        }
        custobj.gender = value;
        value = PROMPT("enter the Email Id : ");
        custobj.emailid = value;
        input = Number(PROMPT("enter the Adhar No : "));
        custobj.adhar_no = input;
        flag = true; //reset the flag
        while (flag) {
            input = Number(PROMPT("enter the mobile NUmber : "));
            flag = (0, CustomerDetailValidation_1.checkMobileNumberCorrect)(input);
        }
        custobj.mobileno = input;
        commonDetails();
    });
}
function currentCustomerDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        let input;
        let flag = true;
        custobj.customertype = "company";
        custobj.accType = "current";
        input = PROMPT("Enter the Name (Company Name or Your Name         :  ");
        custobj.customerName = input;
        input = PROMPT("enter the company pan no (without gaps)    :  ");
        custobj.pan_no = input;
        input = PROMPT("Enter the nature of Buisness (eg:- transportation , retails,jwellery ...)");
        custobj.nature_of_buisness = input;
        input = PROMPT("enter the company email :  ");
        custobj.emailid = input;
        while (flag) {
            input = Number(PROMPT("enter the company mobile Number  :  "));
            flag = (0, CustomerDetailValidation_1.checkMobileNumberCorrect)(input);
        }
        custobj.mobileno = input;
        commonDetails();
    });
}
function commonDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        let input;
        input = PROMPT("enter the Addrress   :  ");
        custobj.address = input;
        input = PROMPT("enter the city       :  ");
        custobj.city = input;
        input = PROMPT("enter the District    :  ");
        custobj.district = input;
        input = PROMPT("enter the State        :  ");
        custobj.state = input;
    });
}
function message(cus_id) {
    return __awaiter(this, void 0, void 0, function* () {
        let query;
        let resultArray = [];
        query = `SELECT * FROM account_details WHERE customer_id=${cus_id};`;
        resultArray = yield (0, DbQueryController_1.resultsetMetadata)(query);
        console.log("ACCOUNT NO :" + resultArray[0]);
        query = "SELECT * FROM customerdetail WHERE customer_id=" + cus_id + ";";
        resultArray = yield (0, DbQueryController_1.resultsetMetadata)(query);
        console.log(" Customer Id :" + resultArray[0] + "\n CUSTOMER NAME :" + resultArray[1] + "\n CUSTOMER TYPE :" + resultArray[2]);
    });
}
