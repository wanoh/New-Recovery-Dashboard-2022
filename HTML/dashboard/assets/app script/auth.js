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
    const checkIsNumber = value => typeof(value) == 'number' ? false : true; 

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
        let usersBankWithdrawalsReq = db.collection("userBankwithdrawalRequest");
        let usersCryptoWithdrawalsReq = db.collection("userCryptowithdrawalRequest");
        let usersBankDepositReq = db.collection("userCryptodepositRequest");
        let usersCryptoDepositReq = db.collection("userbankdepositRequest");
        let usersIncomingTransactions = db.collection("incomingTransaction");
        let userActivity = db.collection("userActivity")
        let userAccBalance = db.collection("accountBalances")
        let userDocVerification = db.collection("documentsVerification")

        let user_Profile = {
            account_ID : "please provide",              
            account: "Recovery",
            email: registerEmail,
            password : registerPassword,
            firstName: "Please Provide",
            lastName : "Please Provide",
            address :"Please Provide",
            city : "Please Provide",
            country : "Please Provide",
            phone : "Please Provide",
            lastLogin : "lastlogintime",
            occupation : "please provide",
            DOB : "",


            //userPotential: Number , // 1 = not interested , 2 = needs more time, 3 = potential, 4 = high potential, 5 = FTD, 6 = taxcode , 7 = second Deposit , 8 = second deposit , 9 = burn
            joinDate: "provide",
            taxIdNumber :"provide",
            taxIdStatus :false,
            emailVerified : false,
            assignedAgent : "provide",
        }
        let user_Balances = {
            totalBalance : "00.00",
            cryptoBalance : "00.00",
            commodityBalance : "00.00",
            forexBalance : "00.00",
            stocksBalance : "00.00"
        }
        let proof_Documents = {
            //PROOF OF DOCUMENTATION VERIFICATION 
    
            POI : false,  //Proof Of Identification
            POL : false,  //Proof Of Location
            POC : false,  //Proof Of Communication
            POT : false,  //proof Of Account
            POA : false,  //Proof Of Transactions

        }  

        let deposit_Transactions = [
            { "databaseID" :'1',
              "userID" : User.uid,
              "transactionID" : "RDT5968",
              "transactionNo" : "",
              "transactionTime" : "12:09 AM",
              "depositOrigin" : "agent 1",
              "depositDate" : "23/06/2021",
              "amount" : "€ 00.00",
              "type" : "Crypto Deposit",
              "status" : false,
              "statusType" : "",

        },
            { "databaseID" :'2',
              "userID" : User.uid,
              "transactionID" : "RDT345",
              "transactionNo" : "",
              "transactionTime" : "04:09 PM",
              "depositOrigin" : "agent 2",
              "depositDate" : "15/02/2021",
              "amount" : "€ 00.00",
              "type" : "Bank Deposit",
              "status" : true,
              "statusType" : "",

        },
            { "databaseID" :'3',
              "userID" : User.uid,
              "transactionID" : "RDT384",
              "transactionNo" : "",
              "transactionTime" : "02:09 PM",
              "depositOrigin" : "agent 3",
              "depositDate" : "13/08/2021",
              "amount" : "€ 00.00",
              "type" : "Crypto Deposit",
              "status" : false,
              "statusType" : "",

        }

    ];
        
        let withdrawal_Transactions = [ // should have three nested array of objects 1. withdrawa, 2. withdrawal request, 3. all editable info about withdrawal section 
           
            { "userID":"",
            "transactionID" : "",
            "transactionNo." :"",
            "transactionTime" : "",
            "withdrawalOrigin" : "",//user or Admin
            "withdrawalDate" : "",
            "amount" : "€ 00.00",
            "type" : "",
            "status" : "",
            "statusType": "" },

           { "userID":"",
            "transactionID" : "",
            "transactionNo." :"",
            "transactionTime" : "",
            "withdrawalOrigin" : "",//user or Admin
            "withdrawalDate" : "",
            "amount" : "€ 00.00",
            "type" : "",
            "status" : "",
            "statusType": "" },

           { "userID":"",
            "transactionID" : "",
            "transactionNo." :"",
            "transactionTime" : "",
            "withdrawalOrigin" : "",//user or Admin
            "withdrawalDate" : "",
            "amount" : "€ 00.00",
            "type" : "",
            "status" : "",
            "statusType": "" },
            ];
         
        let incoming_Transaction = [
             {
            "userID": User.uid,
            "transactionTime" : "13.05",
            "incoOrigin" : "Alpha Bank",                
            "amount" : "00.00",                
            "progress" : 45, //value linked with status
            "incDepoStatus" : "",
            "incoDepoDate":"10/11/2022",
            "transactionNo" :1
              },
             {
                "userID": User.uid,
                "transactionTime" : "10.47",
                "incoOrigin" : "Global Money",                
                "amount" : "00.00",                
                "progress" : 15, //value linked with status
                "incDepoStatus" : "",
                "incoDepoDate":"18/04/2022",
                "transactionNo": 2
            },
             {
                "userID": User.uid,
                "transactionTime" : "16.23",
                "incoOrigin" : "finace Inc.",                
                "amount" : "00.00",                
                "progress" : 75, //value linked with status
                "incDepoStatus" : "",
                "incoDepoDate":"23/08/2022",
                "transactionNo": 3
            }
        ];
              
       let user__bank_withdrawals_request  = [
           {
              req_ID : "1",
          }
        ];
       let user__crypto_withdrawals_request = [
           {
              req_ID : "1",
          }
        ];
       let user__bank_deposit_request = [
         {
            req_ID : "1",
        }
      ];
       let user__crypto_deposit_request = [
         {
            req_ID : "1",
        }
     ]; 
       let user_Activity = [
           {
            actName: "",
            actTime : "",
            actExecutor: "",  
          }
        ]
        
       console.log('user created', userCredential.user,User.uid);
       userProfileRef.doc(User.uid).set(user_Profile);
       userAccBalance.doc(User.uid).set(user_Balances);
       userDocVerification.doc(User.uid).set(proof_Documents);
       usersDeposits.doc(User.uid).set({deposit_Transactions});
       usersWithdrawals.doc(User.uid).set({withdrawal_Transactions});
       usersIncomingTransactions.doc(User.uid).set({incoming_Transaction});
       userActivity.doc(User.uid).set({user_Activity});
       usersBankWithdrawalsReq.doc(User.uid).set({user__bank_withdrawals_request});
       usersCryptoWithdrawalsReq.doc(User.uid).set({user__crypto_withdrawals_request});
       usersBankDepositReq.doc(User.uid).set({user__bank_deposit_request})
       usersCryptoDepositReq.doc(User.uid).set({user__crypto_deposit_request})
       

       .then(()=> {
           Swal.fire('Any fool can use a computer')
           window.location.href = "index.html";
           form.reset()
       }).then(()=> {
           User.sendEmailVerification()
       }).then(()=>{
           console.log("email verification sent")
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
    let now_user = firebase.auth().currentUser;


    if (user) {

            const user__Profile = db.collection('userProfile').doc(now_user.uid) ;
            const user__documentVerification = db.collection('documentsVerification').doc(now_user.uid) ;
            const user__balances = db.collection('accountBalances').doc(now_user.uid);
            const user__Deposits = db.collection('depositTransactions').doc(now_user.uid) ;
            const user__withdrawals = db.collection('withdrawalTransactions').doc(now_user.uid) ;
            const user__Incoming_Transactions = db.collection('incomingTransaction').doc(now_user.uid);
            const user__bank_withdrawals_requests = db.collection('userBankwithdrawalRequest').doc(now_user.uid);
            const user__crypto_withdrawals_requests = db.collection('userCryptowithdrawalRequest').doc(now_user.uid);
            const user__bank_deposits_requests = db.collection('userbankdepositRequest').doc(now_user.uid);
            const user__crypto_deposits_requests = db.collection('userCryptodepositRequest').doc(now_user.uid);
            const users__Activities = db.collection('userActivity').doc(now_user.uid);


 

            user__balances.get().then((doc) => {
                console.log(doc.data().cryptoBalance);
                let dashboardPage = document.getElementById('dashboardPage');

              if(dashboardPage){
                  updateBalances(doc.data().cryptoBalance, doc.data().stocksBalance, doc.data().commodityBalance, doc.data().forexBalance)
              }else{
                  console.log('**dashboard**')
              }

                    
            });

            user__Incoming_Transactions.get().then((doc) => {
                //load dashboard page
                let dashboardPage = document.getElementById('dashboardPage');

                for(let key in doc.data().incoming_Transaction){
                    const {incoOrigin, progress,incoDepoDate,amount,transactionNo} = doc.data().incoming_Transaction[key];
                    console.log((doc.data().incoming_Transaction[key]));
                    const  incomingTBodyEl = document.querySelector('#incomingTransactionsUI');

                    const incoming_table_row = document.createElement('tr');

                    if(dashboardPage){
                        console.log(incom_transID(transactionNo))
                       console.log(incom_comp_Name(incoOrigin))
                        console.log(incom_date(incoDepoDate))
                        console.log(incom_amount(amount))
                       console.log(incom_status(progress))
                       console.log(incom_progress(progress))
                    }else{
                        console.log('**dashboard**')
                    }
      

                }
            });

            user__Profile.get().then((doc)=>{
                //Load the profile page
                let profilePage = document.getElementById('profile_page');

                let profileRef = doc.data();
                const { email, password, firstName, lastName, address, city,country, phone, occupation, DOB} = profileRef

                if(profilePage){
                profile_display(firstName,lastName,email,country,city,address,phone)
                }else{
                    console.log('**profilepage**')
                }


                // profileRef.update({
                //     firstName : updatePersonal()[0],
                //     lastName : updatePersonal()[1],
                //     email : updatePersonal()[2]
                // })
                // .then(() =>{
                //     Swal.fire('updated')
                // }).catch((error)=>{
                //     console.log('doc not updated',error)
                // })

                // updatePersonal(email,firstName,lastName,DOB,occupation,profileRef)
            });

            user__documentVerification.get().then((doc) =>{
                 //Load the profile page
                 let profilePage = document.getElementById('profile_page');

                let verificationRef = doc.data();
                const {POI,POL,POC,POA,POT} = verificationRef

                if(profilePage){
                    verification_display(POI,POL,POC,POA,POT)
                    }else{
                        console.log('**profilepage**')
                    }

            });

            user__Deposits.get().then((doc)=>{
                let deposits_transactions = doc.data();
            });

            user__withdrawals.get().then((doc)=>{
                let withdrawals_Transactions_data = doc.data();
            });


            /**LIST OF ALL WITHDRAWAL ACTIVITY UPDATE FUNCTIONS */
             const updateBankWithActivity = (dataLoc) =>{
                 let updateText = `withdrawal request was issued by this user`;
                
                 users__Activities.update({
                    user_Activity: firebase.firestore.FieldValue.arrayUnion({withdrawData})
                });
              

            } 

            user__bank_withdrawals_requests.get().then((doc) =>{
                let bank_withdrawals_data = doc.data()

                let bank_withdrawal_form = document.querySelector("#bankWithdrawalForm");

                setListener(bank_withdrawal_form, 'submit', (e) =>{
                    e.preventDefault();

                    let bank_with_amount = document.querySelector("#bankWithAmount")
                    let bank_with_acc_hol_name = document.querySelector("#bankWithAccHolName")
                    let bank_with_acc_number = document.querySelector("#bankWithAccNumber")
                    let bank_with_iban_number = document.querySelector("#bankWithIbanNumber")
                    let bank_with_bank_name = document.querySelector("#bankWithBankName")
                    let bank_with_country = document.querySelector("#bankWithCountry")
                    let bank_with_swift_code = document.querySelector("#bankWithSwiftCode")

                     withdrawData = {                       
                        amount:  bank_with_amount.value,
                        accountHolder: bank_with_acc_hol_name.value,
                        accountNumber :bank_with_acc_number.value,
                        //ibanNumber: bank_with_iban_number.valid,
                        bankName:  bank_with_bank_name.value,
                        bankCountry: bank_with_country.value,
                        swiftCoe:  bank_with_swift_code.value                    
                      }
                      let isBankAmountValid = checkWithAmount();
                          
                      let isWithdrawalFormValid = isBankAmountValid

                      if(isWithdrawalFormValid){

                        user__bank_withdrawals_requests.update({
                            user__bank_withdrawals_request: firebase.firestore.FieldValue.arrayUnion({withdrawData})
                        });
                      }
                        
                        
                })
            });

            user__crypto_withdrawals_requests.get().then((doc) =>{
                let crypto_withdrawals_data = doc.data()
                let crypto_withdrawals_form = document.querySelector("#cryptoWithdrawalForm")
                

                setListener(crypto_withdrawals_form,'submit', (e) =>{
                    e.preventDefault();

                    console.log("yes")
                })
            });

            user__bank_deposits_requests.get().then((doc) =>{
                let bank_deposits_data = doc.data()

            });

            user__crypto_deposits_requests.get().then((doc) =>{
                let crypto_deposit_data = doc.data()
            });
            

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
   