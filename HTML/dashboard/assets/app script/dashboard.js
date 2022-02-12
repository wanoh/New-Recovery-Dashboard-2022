'use strict';

let crypto_El = document.getElementById('cryptoUI');
let forex_El = document.querySelector('#forexUI');
let stocks_El = document.querySelector('#stocksUI');
let commodities_El = document.querySelector('#commoditiesUI');
let incomingTBodyEl = document.querySelector('#incomingTransactionsUI');

let incoming_tabale_div = document.createElement('div');





var setListener = (element, type, handler) => {
  if (!element) {
    return;
  }
  element.addEventListener(type, handler);
  return () => {
    element.removeEventLister(type, handler);
  };
};


const updateAttributes = (element, attributes) => {
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

const updateBalances = (dataCrypto, dataStocks, dataComm, dataForex) =>{  
  let crypto_bal = document.createElement('span');
  let stocks_bal = document.createElement('span');
  let comm_bal = document.createElement('span');
  let forex_bal = document.createElement('span');

  crypto_bal.innerHTML = dataCrypto;
  stocks_bal.innerHTML = dataStocks;
  comm_bal.innerHTML = dataComm;
  forex_bal.innerHTML = dataForex;

  crypto_El.appendChild(crypto_bal);
  stocks_El.appendChild(stocks_bal);
  commodities_El.appendChild(comm_bal);
  forex_El.appendChild(forex_bal);  
}


const incom_comp_Name = (company) =>{
  let compTD = document.createElement('td');
  let compDiv = document.createElement('div');
  let compSpan = document.createElement('span');

  updateAttributes(compTD,{"class":"p-3"})
  updateAttributes(compDiv,{"class":"text-primary d-flex align-items-center"})
  updateAttributes(compSpan,{"class":"ms-2"})

  compSpan.innerHTML = company;

  compDiv.appendChild(compSpan);
  compTD.appendChild(compDiv);


  return compTD;
}


const incom_status = (statusVal) => {
  
  function statusClass(){
  
    let class_bg;
    let status_inneHTML;
  
    if (statusVal >= 1 && statusVal <= 17){
      class_bg = "badge bg-soft-danger rounded px-3 py-1";
      status_inneHTML = "Initiated";
    }else if(statusVal >= 18 && statusVal <= 34){
      class_bg = "badge bg-soft-muted rounded px-3 py-1";
      status_inneHTML = "Processing";
      
    }else if(statusVal >= 35 && statusVal <= 50){
      class_bg = "badge bg-soft-dark rounded px-3 py-1";
      status_inneHTML = "Legal";
      
    }else if(statusVal >= 51 && statusVal <= 66){
      class_bg = "badge bg-soft-primary rounded px-3 py-1";
      status_inneHTML = "Litigation";
      
    }else if(statusVal >= 67 && statusVal <= 82){
      class_bg = "badge bg-soft-info rounded px-3 py-1";
      status_inneHTML = "Re-Claim";
      
    }else if(statusVal >= 83 && statusVal <= 97){
      class_bg = "badge bg-soft-warning rounded px-3 py-1";
      status_inneHTML = "Funding";
      
    }else if(statusVal >= 97 && statusVal <= 100){
      class_bg = "badge bg-soft-sucess rounded px-3 py-1";
      status_inneHTML = "Completed";
  
    }
    
    return [class_bg,status_inneHTML];
  }


  
  let statusTD = document.createElement('td');
  let statusDiv = document.createElement('div');

  updateAttributes(statusTD,{"class":"text-center p-3"})
  updateAttributes(statusDiv,{"class":(statusClass()[0])})

  statusDiv.innerHTML = statusClass()[1];

 statusTD.appendChild(statusDiv);

 return statusTD;
}


const incom_amount = (amount) => {
let amountTD = document.createElement('td');

updateAttributes(amountTD,{"class":"text-center p-3"})

amountTD.innerHTML = amount;
return amountTD

}

const incom_date = (date)=>{
  let dateTD = document.createElement('td');

  updateAttributes(dateTD,{"class":"text-center p-3"})

  dateTD.innerHTML = date;

  return dateTD
}

const incom_progress = (progressVal) => {
  let progressTD = document.createElement('td')
  let progressBox = document.createElement('div')
  let progressDiv = document.createElement('div')
  let progressBar = document.createElement('div')
  let progressText = document.createElement('p')

  function progressValue(){
    let barClass;
    let barStyle;
    let valueClass;

    if (progressVal >= 1 && progressVal <= 17){
      barClass = "progress-bar position-relative bg-danger";
      barStyle = `width :${progressVal}%`;
      valueClass= "progress-value d-block text-danger h6";
    }else if(progressVal >= 18 && progressVal <= 34){
      barClass = "progress-bar position-relative bg-muted";
      barStyle = `width :${progressVal}%`;
      valueClass= "progress-value d-block text-muted h6";
    }else if(progressVal >= 35 && progressVal <= 50){
      barClass = "progress-bar position-relative bg-dark";
      barStyle = `width :${progressVal}%`;
      valueClass= "progress-value d-block text-dark h6";
    }else if(progressVal >= 51 && progressVal <= 66){
      barClass = "progress-bar position-relative bg-primary";
      barStyle = `width :${progressVal}%`;
      valueClass= "progress-value d-block text-primary h6";
    }else if(progressVal >= 67 && progressVal <= 82){
      barClass = "progress-bar position-relative bg-info";
      barStyle = `width :${progressVal}%`;
      valueClass= "progress-value d-block text-info h6";
    }else if(progressVal >= 83 && progressVal <= 97){
      barClass = "progress-bar position-relative bg-warning";
      barStyle = `width :${progressVal}%`;
      valueClass= "progress-value d-block text-warning h6";
    }else if(progressVal >= 97 && progressVal <= 100){
      barClass = "progress-bar position-relative bg-success";
      barStyle = `width :${progressVal}%`;
      valueClass= "progress-value d-block text-success h6";

    }
 return [barClass,valueClass,barStyle]

}

updateAttributes(progressBox,{"class":"progress-box"})
updateAttributes(progressDiv,{"class":"progress"})
updateAttributes(progressBar,{"class":progressValue()[0], "style":progressValue()[2]})
updateAttributes(progressText,{"class":progressValue()[1], "style":"font-size: smaller"})

progressText.innerHTML = `${progressVal}%`;

progressBar.appendChild(progressText);
progressDiv.appendChild(progressBar);
progressBox.appendChild(progressDiv);
progressTD.appendChild(progressBox);

return progressTD;


}



const incom_transID = (transId) =>{
  let transIdTH = document.createElement('th');

  updateAttributes(transIdTH,{"class":"p-3"})

  transIdTH.innerHTML = transId;
  
  return transIdTH;

  
}