// мне нужно ипортировать все модули до того, как загрузиться вся страничка
import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
  // setTimeout я передаю функцию колбек которая запуститься через 50000мс, которая внутри себя имеет функцию вызова модального окна первым агрументов предаю само окно по класу или id или ещё как-то и передаю вызов самого таймера и openModal должен быть имортирован т.к. в modal.js оно вынесено за общий импорт т.к. она долджна работать не зависимо
  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000); 

  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active' ); 
  modal('[data-modal]', '.modal', modalTimerId); 
  timer('.timer', '2020-06-11'); // '.timer' - это элемент на странице и id в модуле, а '2020-06-11' - deadLine
  cards(); 
  calc(); 
  forms('form', modalTimerId); // сюда тоже надо передать modalTimerId т.к. он содержит обнуление таймера. А по скольку в форме тоже открывается модальне окно и чтобы таймер не начал произвольно работать, то нужно в его туда передать в качестве аргумента
  slider({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    slide: '.offer__slide',
    totalCounter: '#total',
    currentCounter:'#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
  }); 
  
});

 
