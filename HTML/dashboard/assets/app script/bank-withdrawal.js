'use srtict';

console.log('this is the bank withdrawal page');

let bank_with_amountEl = document.querySelector("#bankWithAmount")
let bank_with_acc_hol_nameEl = document.querySelector("#bankWithAccHolName")
let bank_with_acc_numberEl = document.querySelector("#bankWithAccNumber")
let bank_with_iban_numberEl = document.querySelector("#bankWithIbanNumber")
let bank_with_bank_nameEl = document.querySelector("#bankWithBankName")
let bank_with_countryEl = document.querySelector("#bankWithCountry")
let bank_with_swift_codeEl = document.querySelector("#bankWithSwiftCode")


const checkWithAmount = () =>{
let valid = false
let amountValue = bank_with_amountEl.value.trim();
if(!isRequired(amountValue)){
    showError(bank_with_amountEl, 'Amount Cannot Be Blank');
}
else if(!checkIsNumber(amountValue)){
    showError(bank_with_amountEl, 'Please Input a number amount')
} else {
    showSuccess(bank_with_amountEl);
    valid = true;
}
return valid;
}

const checkWithHoldersName = () =>{
    let valid = false
    let holderNameValue = bank_with_acc_hol_nameEl.value

    if(!isRequired(holderNameValue)){
        showError(bank_with_acc_hol_nameEl,'Amount Cannot Be Blank')
    }
    else {
        showSuccess(bank_with_acc_hol_nameEl)
        valid = true;
    }
    return valid;
}

const checkWithAccNumber = () =>{
    let valid = false
    let accNumberValue = bank_with_acc_numberEl.value






    return valid;
}

const checkWithIbanNumber = () =>{
    let valid = false
    let ibanNumberValue = bank_with_iban_numberEl.value






    return valid;
}

const checkWithBankName = () =>{
    let valid = false
    let bankNameValue = bank_with_bank_nameEl.value






    return valid;
}

const checkWithSwiftCode = () =>{
    let valid = false
    let holderNameValue = bank_with_swift_codeEl.value






    return valid;
}

const sendbankemail = () =>{
    
}
