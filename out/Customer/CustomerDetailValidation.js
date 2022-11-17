"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkGender = exports.checkDateOfBirthFormat = exports.checkMobileNumberCorrect = void 0;
let allow;
function checkMobileNumberCorrect(mobileno) {
    allow = true;
    if (mobileno >= 6000000000 && mobileno <= 9999999999) {
        allow = false;
    }
    else {
        console.log("enter the valid Mobile Number");
    }
    return allow;
}
exports.checkMobileNumberCorrect = checkMobileNumberCorrect;
function checkDateOfBirthFormat(date) {
    allow = true;
    let arr = date.split("");
    // console.log(arr);
    if (arr[4] == '-' && arr[7] == '-' && (arr.length == 10)) {
        allow = false;
    }
    else {
        console.log("\t<<<<enter the date of birth in this Format(YYYY-MM-DD)>>>>");
    }
    return allow;
}
exports.checkDateOfBirthFormat = checkDateOfBirthFormat;
function checkGender(gender) {
    allow = true;
    let gen = gender.toLowerCase();
    if (gen === 'male' || gen === "female" || gen === "transgender") {
        allow = false;
    }
    else {
        console.log("\t<<< Gender Is Not Valid >>>");
    }
    return allow;
}
exports.checkGender = checkGender;
