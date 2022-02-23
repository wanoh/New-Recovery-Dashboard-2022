'use srtict';

console.log('this is the profile settings page');


var setListener = (element, type, handler) => {
    if (!element) {
    return;
    }
    element.addEventListener(type, handler);
    return () => {
    element.removeEventLister(type, handler);
    };
};

let personalForm = document.querySelector('#personalDetailsUI');
let contactForm = document.querySelector('#contactdetailsUI');
let passwordForm = document.querySelector('#passwordDetailsUI');
let locationForm = document.querySelector('#locationDetailsUI');

const updatePersonal = () =>{

    let first__name = document.querySelector("#first__name")
    let last__name = document.querySelector("#last__name")
    let profile__email = document.querySelector("#profile__email")
    let ProfileOccupation = document.querySelector("#occupation")
    let profile__DOB = document.querySelector("#date_of_birth")
    
    setListener(personalForm, 'submit', (e)=>{
        e.preventDefault();
    
    

       const check_firstName = () => {
        let valid = false;
        const min = 3,
            max = 25;
        const username = first__name.value.trim();
        if (!isRequired(username)) {
            showError(first__name, 'Username cannot be blank.');
        } else if (!isBetween(username.length, min, max)) {
            showError(first__name, `Username must be between ${min} and ${max} characters.`)
        } else {
            showSuccess(first__name);
            valid = true;
        }
        return valid;
       }

       const check_lastName = () => {
        let valid = false;
        const min = 3,
            max = 25;
        const username = last__name.value.trim();
        if (!isRequired(username)) {
            showError(last__name, 'Username cannot be blank.');
        } else if (!isBetween(username.length, min, max)) {
            showError(last__name, `Username must be between ${min} and ${max} characters.`)
        } else {
            showSuccess(last__name);
            valid = true;
        }
        return valid;
       } 

       const check_email = () => {        
        let valid = false;
        const email = profile__email.value.trim();
        if (!isRequired(email)) {
            showError(profile__email, 'Email cannot be blank.');
        } else if (!isEmailValid(email)) {
            showError(profile__email, 'Email is not valid.')
        } else {
            showSuccess(profile__email);
            valid = true;
        }
        return valid;
       }
       
       let ifFirstname = check_firstName();
            iflastName = check_lastName();
            ifEmail = check_email();
       
       
       
        let formValid = ifFirstname && iflastName && ifEmail;

    })
    
    
    console.log("the personal has been updated")
    

if (formValid){
 let fVal = first__name.value;
 let lVal = last__name.value;
 let pEmail = profile__email.value;

retrurn [fVal,lVal,pEmail]

}

}


const updateContact = () => {

    setListener(contactForm, 'submit', (e)=>{
        e.preventDefault();
        
       let profile__number = document.getElementById("profile__number")
       let profile__Hnumber = document.getElementById("profile__Hnumber")
    
    })
}

const updatePassword = () => {

    setListener(passwordForm, 'submit', (e)=>{
        e.preventDefault();
    
        
       let profile_oldPassword = document.getElementById ("profile_old_password")
       let profile_newPassword = document.getElementById("profile_new_password")
       let profile_newPasswordRetype = document.getElementById("profile_new_password_retype")
    
    })
}

const updateLocation = () => {

    setListener(locationForm, 'submit', (e)=>{
        e.preventDefault();
    
        let profile__country = document.getElementById("profile__country")
        let profile__city = document.getElementById("profile__city")
        let profile__residence = document.getElementById("profile__residence")
        
    })
}


