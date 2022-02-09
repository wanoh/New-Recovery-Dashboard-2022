'use strict';

let crypto_El = document.getElementById('cryptoUI');
let forex_El = document.querySelector('#forexUI');
let stocks_El = document.querySelector('#stocksUI');
let commodities_El = document.querySelector('#commoditiesUI');
let incomingTBodyEl = document.querySelector('#incomingTransactionsUI');

console.log(crypto_El)


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


const updateBalances = (data) =>{
    updateAttributes(crypto_El,{"data-target":data})

}