import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';

window.addEventListener('DOMContentLoaded', () => {
    calc();
    cards();
    forms('form', '.modal', '.message', '[data-close]');
    modal('[data-modal]', '[data-close]', '.modal', 30000);
    slider({
        imagesSelector: '.offer__slide',
        prevSelector: '.offer__slider-prev',
        nextSelector: '.offer__slider-next',
        currentSelector: '#current',
        slidesWrapperSelector: '.offer__slider-wrapper',
        slidersFieldSelector: '.offer_slider-inner',
        sliderSelector: '.offer__slider' 
    });
    tabs('.tabcontent', 'tabheader__item', '.tabheader', 'hide-content', 'tabheader__item_active');
    timer('2025-07-22', '.timer');
})