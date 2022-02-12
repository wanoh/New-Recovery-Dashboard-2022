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
