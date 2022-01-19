'use srtict';


var setListener = (element, type, handler) => {
    if (!element) {
    return;
    }
    element.addEventListener(type, handler);
    return () => {
    element.removeEventLister(type, handler);
    };
};



const user = firebase.auth().currentUser;


//REGISTRATION FORM AND ELEMEENT SELECTORS
const usernameEl = document.querySelector('#user-name');
const emailEl = document.querySelector('#register-email');
const passwordEl = document.querySelector('#register-password');
const confirmPasswordEl = document.querySelector('#register-password-confirm');
//const companyNameEl = document.querySelector('#company-name');

const form = document.querySelector('#register-form');




//SET-UP REGISTRATION FOR NEW USER 



const showElement = (el) => {    
    el.classList.remove('d-none');
    el.classList.add('d-block');
  };

  const hideElement = (el) => {    
    el.classList.remove('d-block');
    el.classList.add('d-none');
  };


const checkUsername = () => {
    let valid = false;
    const min = 3,
        max = 25;
    const username = usernameEl.value.trim();
    if (!isRequired(username)) {
        showError(usernameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(usernameEl);
        valid = true;
    }
    return valid;
};

    const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};

    const checkPassword = () => {
    let valid = false;


    const password = passwordEl.value.trim();

    if (!isRequired(password)) {
        showError(passwordEl, 'Password cannot be blank.');
    } else if (!isPasswordSecure(password)) {
        showError(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordEl);
        valid = true;
    }

    return valid;
};

    const checkConfirmPassword = () => {
    let valid = false;
    // check confirm password
    const confirmPassword = confirmPasswordEl.value.trim();
    const password = passwordEl.value.trim();

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordEl, 'Please enter the password again');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordEl, 'The password does not match');
    } else {
        showSuccess(confirmPasswordEl);
        valid = true;
    }
    return valid;
};


const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

    const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

    const isRequired = value => value === '' ? false : true;
    const isBetween = (length, min, max) => length < min || length > max ? false : true;


    const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('has-success');
    formField.classList.add('has-danger');
    
    // show the error message
    //const error = formField.querySelector('.small');
    //error.textContent = message;
    const formSibling = input.nextElementSibling;//get net element of input <small>
    formSibling.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('has-danger');
    formField.classList.add('has-success');

    // hide the error message
    //const error = formField.querySelector('.small');
    const formSibling = input.nextElementSibling; //get net element of input <small>
    formSibling.textContent = '';
}


