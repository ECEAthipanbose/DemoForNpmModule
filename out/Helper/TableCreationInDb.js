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
exports.createDbTableTrigger = void 0;
const DbQueryController_1 = require("../Helper/DbQueryController");
function createDbTables() {
    let query;
    let arr = [];
    query = "CREATE TABLE IF NOT EXISTS customerdetail(customer_id serial primary key,"
        + "customer_name VARCHAR(50) NOT NULL,customer_type VARCHAR(50) NOT NULL);";
    arr.push(query);
    query = "CREATE TABLE IF NOT EXISTS personalTypeCustomer_Details(personal_type_id serial primary key,"
        + " date_of_birth DATE NOT NULL,gender VARCHAR(11) NOT NULL,customer_address VARCHAR(50) NOT NULL,AdharCard_no bigint NOT NULL,"
        + " customer_email VARCHAR(50),contact_no bigint NOT NULL,city VARCHAR(50) NOT NULL,district VarChar(50) NOT NULL,state VARCHAR(50),"
        + "customer_id int NOT NULL,UNIQUE(AdharCard_no),CONSTRAINT customerid FOREIGN KEY(customer_id) REFERENCES customerdetail(customer_id));";
    arr.push(query);
    query = "CREATE TABLE IF NOT EXISTS account_type(acc_type_id serial PRIMARY KEY,"
        + "acc_type VARCHAR(50) NOT NULL);";
    arr.push(query);
    query = "CREATE TABLE IF NOT EXISTS account_details(account_no bigserial PRIMARY KEY,"
        + "acc_type_id int NOT NULL,"
        + "CONSTRAINT acc_type FOREIGN KEY(acc_type_id) REFERENCES account_type(acc_type_id),"
        + "customer_id int not null,CONSTRAINT customer_id FOREIGN KEY(customer_id) REFERENCES customerdetail(customer_id),"
        + "status VARCHAR(8) NOT NULL);";
    arr.push(query);
    query = "CREATE TABLE IF NOT EXISTS customer_login(cus_login_id serial PRIMARY KEY,cus_user_name VARCHAR(50) NOT NULL,"
        + "cus_password VARCHAR(50) NOT NULL,account_no bigint NOT NULL,UNIQUE(cus_user_name),"
        + "CONSTRAINT accountno FOREIGN KEY(account_no) REFERENCES account_details(account_no));";
    arr.push(query);
    query = "CREATE TABLE IF NOT EXISTS moneytransaction(money_trans_id serial primary key,"
        + "transfer_from bigint not null,transfer_to bigint NOT NULL,tranfer_amount DOUBLE PRECISION NOT NULL,"
        + "transfer_date DATE DEFAULT CURRENT_DATE)";
    arr.push(query);
    query = "CREATE TABLE IF NOT EXISTS customer_statement("
        + "statement_id SERIAL PRIMARY KEY,account_no BIGINT NOT NULL,"
        + "deposit DOUBLE PRECISION,withdraw DOUBLE PRECISION,current_balance DOUBLE PRECISION,"
        + "money_trans_id bigint,date DATE DEFAULT CURRENT_DATE ,"
        + "CONSTRAINT date FOREIGN KEY(money_trans_id) REFERENCES moneytransaction(money_trans_id));";
    arr.push(query);
    query = "CREATE TABLE IF NOT EXISTS companyTypeCustomer("
        + "company_type_id serial primary key,NATURE_OF_BUISNESS VARCHAR(50) NOT NULL,"
        + "company_address VARCHAR(50) NOT NULL,Company_pan_no VARCHAR(50) NOT NULL,"
        + "Company_email VARCHAR(50),contact_no bigint NOT NULL,city VARCHAR(50) NOT NULL,district VarChar(50) NOT NULL,state VARCHAR(50),"
        + "customer_id int NOT NULL,CONSTRAINT customerid FOREIGN KEY(customer_id) REFERENCES customerdetail(customer_id));";
    arr.push(query);
    query = "CREATE TABLE IF NOT EXISTS manager_login(manager_login_id serial PRIMARY KEY,manager_username VARCHAR(50) NOT NULL,UNIQUE(manager_username),"
        + "manager_password VARCHAR(50) NOT NULL);";
    arr.push(query);
    return arr;
}
function createDbTableTrigger() {
    return __awaiter(this, void 0, void 0, function* () {
        let tablequerys = createDbTables();
        for (let ele of tablequerys) {
            yield (0, DbQueryController_1.executeQuery)(ele);
        }
        console.log('table created in db successfully!');
    });
}
exports.createDbTableTrigger = createDbTableTrigger;
