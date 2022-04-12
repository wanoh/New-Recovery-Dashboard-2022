'use srtict';

console.log('this is the profile page');

const display_Value = (profileVal, ValElemnt) => {
    let spanVal = ValElemnt.nextElementSibling;
    spanVal.innerHTML = profileVal;
    }

// DISPLAY PROFILE SECTION
const profile_display = (
    data_firstName,
    data_lastName,
    data_email,
    data_country,
    data_city,
    data_address,
    data_phone
    ) =>{

        let firstNameEl = document.getElementById('firstNameUI')
        let lastNameEl = document.getElementById('lastNameUI')
        let emailEl = document.getElementById('emailUI')
        let countryEl = document.getElementById('countryUI')
        let cityEl = document.getElementById('cityUI')
        let addressEl = document.getElementById('addressUI')
        let cellNoEl = document.getElementById('phoneNumberUI')

        let firstNameVal = display_Value(data_firstName,firstNameEl)
        let lastNameVal = display_Value(data_lastName,lastNameEl)
        let emailVal = display_Value(data_email,emailEl)
        let countryVal = display_Value(data_country,countryEl)
        let cityVal = display_Value(data_city,cityEl)
        let addressVal = display_Value(data_address,addressEl)
        let phoneVal = display_Value(data_phone,cellNoEl)

        return firstNameVal,lastNameVal,emailVal,countryVal,cityVal,addressVal,phoneVal
}

const display_verification = (proofVal, ValElemnt) => {
    let spanVal = ValElemnt.nextElementSibling;
    if(proofVal){
        spanVal.classList.add('bg-success')
        spanVal.innerHTML = 'verified'
    }
    else if(!proofVal){
        spanVal.classList.add('bg-danger')
        spanVal.innerHTML = 'not-verified'
    }

    return spanVal
    }

// PROOF DOCUMENTS ELEMENT SELECTORS

const verification_display = ( data_identity, data_address, data_comm, data_account, data_trans) => {

    let proofIdentityEl = document.getElementById('proofOfIdentityUI')
    let proofAddressEl = document.getElementById('proofOfAddressUI')
    let proofCommEl = document.getElementById('proofOfCommUI')
    let proofAccountEl = document.getElementById('proofOfAccUI')
    let prooftransEl = document.getElementById('proofOfTransUI')


    let identityVal = display_verification(data_identity,proofIdentityEl)
    let addressVal = display_verification(data_address,proofAddressEl)
    let commVal = display_verification(data_comm,proofCommEl)
    let accountVal = display_verification(data_account,proofAccountEl)
    let transVal = display_verification(data_trans,prooftransEl)

return identityVal,addressVal,commVal,accountVal,transVal

}
