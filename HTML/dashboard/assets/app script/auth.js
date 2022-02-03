'use srtict';

console.log("js page loaded")


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
const firstNameEl = document.querySelector('#register-first-name');
const lastNameEl = document.querySelector('#register-last-name');
const emailEl = document.querySelector('#register-email');
const passwordEl = document.querySelector('#register-password');
const confirmPasswordEl = document.querySelector('#confirm-register-password');
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


  const checkFirstname = () => {
    let valid = false;
    const min = 3,
        max = 25;
    const username = firstNameEl.value.trim();
    if (!isRequired(username)) {
        showError(firstNameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(firstNameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(firstNameEl);
        valid = true;
    }
    return valid;
};

const checkLastname = () => {
    let valid = false;
    const min = 3,
        max = 25;
    const username = lastNameEl.value.trim();
    if (!isRequired(username)) {
        showError(lastNameEl, 'Username cannot be blank.');
    } else if (!isBetween(username.length, min, max)) {
        showError(lastNameEl, `Username must be between ${min} and ${max} characters.`)
    } else {
        showSuccess(lastNameEl);
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

setListener(form,'submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();
  
    // validate fields
    let isFirstNameValid  = checkFirstname(),
        isLastNameValid = checkLastname(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();
  
    let isFormValid = 
        isFirstNameValid && 
        isLastNameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;
  
    // submit to the server if the form is valid
    if (isFormValid) {
          // get user info
    const registerEmail = document.querySelector('#register-email').value;
    const registerPassword = document.querySelector('#register-password').value;
  
   // sign up the user
    
      auth.createUserWithEmailAndPassword(registerEmail, registerPassword).then((userCredential) => {
        console.log(userCredential.uid);

        const User = firebase.auth().currentUser;
        
        let userProfileRef = db.collection("userProfile");
        let usersDeposits = db.collection("depositTransactions");
        let usersWithdrawals = db.collection("withdrawalTransactions");
        let usersIncomingTransactions = db.collection("incomingTransaction");
        
       console.log('user created', userCredential.user,User.uid);
       userProfileRef.doc(User.uid).set({
           name : "wan",
       });
       usersDeposits.doc(User.uid).set({
        name : "wandep",
    }) .then(()=>{
           console.log("doc written")
           Swal.fire('Any fool can use a computer')
           window.location.href = "index.html";
           form.reset()
       })
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage,errorCode)

    });      
    }  
  });




      //Login 

      const loginEmailEl = document.querySelector('#login-email');
      const loginPasswordEl = document.querySelector('#login-password');
  
      const loginForm = document.querySelector('#login-form');
  
  
      const logCheckEmail = () => {
      let valid = false;
      const logEmail = loginEmailEl.value.trim();
      if (!isRequired(logEmail)) {
          showError(loginEmailEl, 'Email cannot be blank.');
      } else if (!isEmailValid(logEmail)) {
          showError(loginEmailEl, 'Email is not valid.')
      } else {
          showSuccess(loginEmailEl);
          valid = true;
      }
      return valid;
    };
  
    const logCheckPassword = () => {
      let valid = false;  
      const logPassword = loginPasswordEl.value.trim();  
      if (!isRequired(logPassword)) {
          showError(loginPasswordEl, 'Password cannot be blank.');
      } else if (!isPasswordSecure(logPassword)) {
          showError(loginPasswordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
      } else {
          showSuccess(loginPasswordEl);
          valid = true;
      }  
      return valid;
    };  
    

  setListener(loginForm, 'submit', (e) => {
    // prevent the form from submitting
   e.preventDefault();
 
    // validate fields
   let  isLogEmailValid = logCheckEmail(),
       isLogPasswordValid = logCheckPassword();
       

   let isFormValid = isLogEmailValid &&
       isLogPasswordValid;

    // submit to the server if the form is valid
   if (isFormValid) {
   // get user info from webpage and Dom
   const email = document.getElementById('login-email').value;
   const password = document.getElementById('login-password').value;
   const noUser = document.getElementById('noUser');
   console.log(email, password);
 
   // log the user in
   
   auth.signInWithEmailAndPassword(email, password)
   .then((cred) => {
     console.log(cred.user);

     Swal.fire('Any fool can use a computer')
     window.location.href = "index.html";
     loginForm.reset();     
   })
   .catch((error) => {
     var errorCode = error.code;
     var errorMessage = error.message;
     console.log(errorCode,errorMessage);
     noUser.classList.remove('d-none');
     noUser.classList.add('d-block');
       });   
 }
 });


 auth.onAuthStateChanged((user) => {
     

    if (user) {
        console.log(user.uid, " user is signed in")
    }
    else{
        console.log("no user ")
    }
})























   //logout

   const logout = document.querySelector('#logout');

   setListener(logout, 'click', (e) => {
     e.preventDefault();
     auth.signOut().then(() => {
       console.log('user signed out');
       window.location.replace('login.html');
     });
   });
   