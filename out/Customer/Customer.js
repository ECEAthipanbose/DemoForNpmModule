"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
class Customer {
    constructor() {
        this._status = 'active';
        this.toString = () => `Customer Name :${this._customerName}\nCustomer Type :${this._customertype}`;
    }
    set customerName(customerName) {
        this._customerName = customerName;
    }
    set dateOfBirth(dateOfBirth) {
        this._dateOfBirth = dateOfBirth;
    }
    set gender(gender) {
        this._gender = gender;
    }
    set address(address) {
        this._address = address;
    }
    set emailid(emailid) {
        this._emailid = emailid;
    }
    set customertype(customertype) {
        this._customertype = customertype;
    }
    set city(city) {
        this._city = city;
    }
    set state(state) {
        this._state = state;
    }
    set district(district) {
        this._district = district;
    }
    set accType(accType) {
        this._accType = accType;
    }
    set pan_no(pan_no) {
        this._pan_no = pan_no;
    }
    set status(status) {
        this._status = status;
    }
    set nature_of_buisness(nature_of_buisness) {
        this._nature_of_buisness = nature_of_buisness;
    }
    set mobileno(mobileno) {
        this._mobileno = mobileno;
    }
    set adhar_no(adhar_no) {
        this._adhar_no = adhar_no;
    }
    set acc_type_id(acc_type_id) {
        this._acc_type_id = acc_type_id;
    }
    set cus_id(cus_id) { this._cus_id = cus_id; }
    //getters
    get customerName() {
        return this._customerName;
    }
    get dateOfBirth() {
        return this._dateOfBirth;
    }
    get gender() {
        return this._gender;
    }
    get address() {
        return this._address;
    }
    get emailid() {
        return this._emailid;
    }
    get customertype() {
        return this._customertype;
    }
    get city() {
        return this._city;
    }
    get state() {
        return this._state;
    }
    get district() {
        return this._district;
    }
    get accType() {
        return this._accType;
    }
    get pan_no() {
        return this._pan_no;
    }
    get status() {
        return this._status;
    }
    get nature_of_buisness() {
        return this._nature_of_buisness;
    }
    get mobileno() {
        return this._mobileno;
    }
    get adhar_no() {
        return this._adhar_no;
    }
    get acc_type_id() {
        return this._acc_type_id;
    }
    get cus_id() { return this._cus_id; }
    personalTypeString() {
        return `Date Of Birth :${this._dateOfBirth}\nGender :${this._gender}\nStatus :${this._status}\nEmail :${this._emailid}\nAddress :${this._address}\nMobile No ${this._mobileno}\ncity :${this._city}\nDistrict :${this._district}\nstate :${this._state}`;
    }
    companyTypeString() {
        return `Nature of Buisness :${this._nature_of_buisness}\nCompany PanNo:${this._pan_no}\nStatus :${this._status}\nEmail :${this._emailid}\nAddress :${this._address}\nMobile No :${this._mobileno}\ncity :${this._city}\nDistrict :${this._district}\nstate :${this._state}`;
    }
}
exports.Customer = Customer;
