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
exports.viewCurrentAccount_Customer = exports.viewSavingAccount_Customer = exports.viewCustomerDetail = void 0;
const Customer_1 = require("./Customer");
const DbQueryController_1 = require("../Helper/DbQueryController");
let customerobj = new Customer_1.Customer();
function viewCustomerDetail(accountno) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = "SELECT customer_id,account_details.acc_type_id,account_no,acc_type,status"
            + " FROM account_details INNER JOIN account_type ON account_details.acc_type_id=account_type.acc_type_id WHERE account_no=" + accountno + ";";
        let arrayresult = yield (0, DbQueryController_1.resultsetMetadata)(query);
        if (arrayresult.length > 0) {
            customerobj.cus_id = Number(arrayresult[0]);
            customerobj.acc_type_id = Number(arrayresult[1]);
            console.log("Account no          : \t" + arrayresult[2]);
            console.log("Account Type        : \t" + arrayresult[3]);
            console.log("STATUS              : \t" + arrayresult[4]);
        }
        if (customerobj.acc_type_id === 1) {
            yield viewSavingAccount_Customer(arrayresult);
        }
        else if (customerobj.acc_type_id === 2) {
            yield viewCurrentAccount_Customer(arrayresult);
        }
    });
}
exports.viewCustomerDetail = viewCustomerDetail;
function viewSavingAccount_Customer(arrayresult) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = "SELECT customer_type,customer_name,gender,date_of_birth,customer_email,contact_no,"
            + "customer_address,adharcard_no,city,district,state FROM personaltypecustomer_details INNER JOIN customerdetail ON "
            + "customerdetail.customer_id=personaltypecustomer_details.customer_id"
            + " WHERE customerdetail.customer_id=" + customerobj.cus_id + ";";
        arrayresult = yield (0, DbQueryController_1.resultsetMetadata)(query);
        if (arrayresult.length > 0) {
            customerobj.customertype = arrayresult[0];
            customerobj.status = 'active';
            customerobj.customerName = arrayresult[1];
            customerobj.gender = arrayresult[2];
            customerobj.dateOfBirth = arrayresult[3];
            customerobj.emailid = arrayresult[4];
            customerobj.mobileno = arrayresult[5];
            customerobj.address = arrayresult[6];
            customerobj.adhar_no = arrayresult[7];
            customerobj.city = arrayresult[8];
            customerobj.district = arrayresult[9];
            customerobj.state = arrayresult[10];
            console.log(customerobj.toString());
            console.log(customerobj.personalTypeString());
        }
    });
}
exports.viewSavingAccount_Customer = viewSavingAccount_Customer;
//view CurrentAccount CustomerDetails
function viewCurrentAccount_Customer(arrayresult) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = "SELECT customer_type,customer_name,nature_of_buisness,company_pan_no,company_email,contact_no,company_address,city,district,state"
            + "  FROM companytypecustomer INNER JOIN customerdetail ON "
            + "customerdetail.customer_id=companytypecustomer.customer_id"
            + " WHERE customerdetail.customer_id=" + customerobj.cus_id + ";";
        arrayresult = yield (0, DbQueryController_1.resultsetMetadata)(query);
        if (arrayresult.length > 0) {
            customerobj.customertype = arrayresult[0];
            customerobj.status = 'active';
            customerobj.customerName = arrayresult[1];
            customerobj.nature_of_buisness = arrayresult[2];
            customerobj.pan_no = arrayresult[3];
            customerobj.emailid = arrayresult[4];
            customerobj.mobileno = arrayresult[5];
            customerobj.address = arrayresult[6];
            customerobj.city = arrayresult[7];
            customerobj.district = arrayresult[8];
            customerobj.state = arrayresult[9];
            console.log(customerobj.toString());
            console.log(customerobj.companyTypeString());
        }
    });
}
exports.viewCurrentAccount_Customer = viewCurrentAccount_Customer;
