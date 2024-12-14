/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
     
        //Калькулятор калорий
function calc (params) {
  
   const  result = document.querySelector('.calculating__result span');
      let sex, height, weight, age, ratio;
      if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
      
      sex = 'female';
      localStorage.setItem('sex', 'female');
    }
  
      if(localStorage.getItem('ratio')) {

        ratio = localStorage.getItem('ratio');
    } else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.375);
    }

    function calcTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
        result.textContent = '____'; 
        return; 
      }
      if (sex === 'female') {
        
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3,1 * height) - (4,3 * age)) * ratio);
      } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
    }

   calcTotal(); 

    function initLocalSettings(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
        elem.classList.remove(activeClass);
        if(elem.getAttribute('id') === localStorage.getItem('sex')) {
          elem.classList.add(activeClass);
        }
        if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
          elem.classList.add(activeClass);
        }
      });
        
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active'); 
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    
  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
        elem.addEventListener('click', (e)=>{

        if(e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); 
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }

        console.log(ratio, sex);
      
        elements.forEach(elem => {
          elem.classList.remove(activeClass)
        });
        
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  getStaticInformation('#gender div', 'calculating__choose-item_active'); 
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active'); 

    function getDinamicInformation(selector) {
      const input = document.querySelector(selector);

      input.addEventListener('input', () => {

      if (input.value.match(/\D/g)) {
        // если это будет не число тогда обводка интпута будет красной
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }
            
      switch (input.getAttribute('id')) {
        case 'height': 
          height = +input.value 
          break; 
      case 'weight':
        weight = +input.value;
        break;
      case 'age':
        age = +input.value;
        break;
      }
      calcTotal();
    });
  }

  getDinamicInformation('#height');
  getDinamicInformation('#weight');
  getDinamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc); // экспортирую функцию по умолчанию

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _servises_servises__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../servises/servises */ "./js/servises/servises.js");
// карточки


function cards(params) {
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector); 
      this.transfer = 40; 
      this.changeToUAH(); 
    }

    // курс валюты
    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div'); 
      
      if(this.classes.length === 0) { 
        this.element = 'menu__item'; 
        element.classList.add(this.element); 
      } else {
        this.classes.forEach(className => element.classList.add(className)); 
      }
      
      element.innerHTML = `
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>`;
      this.parent.append(element);
    }
  }

/*  вынесено в servises
 const getResource = async (url) => {
  const res = await fetch(url); 

  if(!res.ok) {// если НЕ ок
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();

  }; */

  (0,_servises_servises__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
  .then(data => {
    data.forEach(({img, altimg, title, descr, price}) => {
      new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _servises_servises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../servises/servises */ "./js/servises/servises.js");
    
    
    
    // Forms
    function forms(formsSelector,modalTimerId) {
    const  forms = document.querySelectorAll(formsSelector);

    const message = {
      loading: 'img/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
      bindPostData(item); 
    });

  /*   вынесено в servises
  const postData = async (url, data) => { 
      let res = await fetch(url, { 
          method: "POST",  
          headers: { 
          'Content-type': 'application/json'
          },
          body: data, 
      });

      return await res.json(); 

    }; */


    function bindPostData(form) { 
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('img'); 
        statusMessage.src = message.loading; 
        statusMessage.style.cssText = `
        display: block;
        margin: 0 auto `;
        form.insertAdjacentElement('afterend', statusMessage);

        const formData = new FormData(form);
    
        const json = JSON.stringify(Object.fromEntries(formData.entries())); 
        (0,_servises_servises__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json).then(data => {
            console.log(data); 
            showThanksModal(message.success);
            statusMessage.remove(); 
        }).catch(()=>{
          showThanksModal(message.failure);
        }).finally(()=>{
          form.reset();
        });
      });
    }

    // Создаю дополнительное окно типа благорадности за отправку формы 

    function showThanksModal(message) { // в аргументы передаю объект message где находятся сообщения и мне нужно всеголишь выбрать нужное
      const prevModalDialog = document.querySelector('.modal__dialog');

      /* Прячу текущее */
       prevModalDialog.classList.add('hide'); // этот клас есть у меня в стилх
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);// передаю класс окна которе нужно ткрыть

      /* Создаю новое и присваеваю ему класс  modal__dialog */
      const thanksModal =  document.createElement('div');
      thanksModal.classList.add('modal__dialog');

      /* Тперь надо сформировать вёрстку */
      thanksModal.innerHTML = `
          <div class="modal__content">
              <div class="modal__close" data-close>×</div>
              <div class="modal__title">${message}</div>
          </div>
        `;

      // и указываю куда его добавляю
      document.querySelector('.modal').append(thanksModal);
      setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal'); // передаю текущее окно с классом кторые нужно закрыть
      }, 4000);
    }

  }
   
    /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
   // modal

   function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

    function openModal(modalSelector, modalTimerId) {
      //modalTimerId буду передавать во всех функция где применяется openModal, потому будет запускться очистка таймера, чтобы он не срабывал кажый интервал времени и так же нужно его передать в form.js чтобы там при вызове мобадьного окна со статусом успешно или не успешно отрпавлено сообзение обнуляло таймер, чтобы он не начл работать
      const modal = document.querySelector(modalSelector);

      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';

      console.log(modalTimerId);
      // проверяю, а установден ли вообще таймер т.е. он в себе должен содержать что он запускает и через какое время
      if (modalTimerId) {
        clearInterval(modalTimerId);
      }
      
    }

// чтобы жёстко не привязывать классы и дата атрбибуты, бо иначе из-за модульности вылазят ошибки в консоли, чтобы это исправить я их буду передавать в качестве аргументов triggerSelector = '[data-modal]', modalSelector = '.modal'

   function modal(triggerSelector, modalSelector, modalTimerId) {
    //const button =  document.querySelectorAll('[data-modal]');
    const button =  document.querySelectorAll(triggerSelector); // быьло так const button =  document.querySelectorAll('[data-modal]');
   

    
     //openModal и colseModalWindow будут ориентироваться на то модальное окно, которое попало в переменную с '.modal'
     modal = document.querySelector(modalSelector); // было так const modalWindow = document.querySelector('.modal'); подальное окно я буду передавать в script.js  modal ('[data-modal]', '.modal'); И жу переменную вставлю в function openModal(modalSelector) и  function colseModalWindow(modalSelector), чтобы они риантровались на текущее модальное окно, что попало в переменную. Так же аргумент modalSelector надо предать во все случаи где я вызываю открытие и закрытие окна 


      button.forEach(function(element) {
        element.addEventListener('click', () => openModal(modalSelector, modalTimerId)); // чтобы функция колбэка работало кореектно т.е. после клика, а не сразу после загруки страницы надо прописать её так () => openModal(modalSelector). Т.е я таким обзаом внутрь функции коллбеэ помещаю функцию вызова модального окна. Тут написан сокращенны вид
      });

      modal.addEventListener('click', (e)=>{
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
          closeModal(modalSelector);
        }
      });


      document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
        
          closeModal(modalSelector);
        }
      });

   
      // const modalTimerId = setTimeout(openModal, 50000); это мне уже не надо т.к. запускай таймер буду в script.js где и буду назначать емё время

      function showModalByScroll(params) {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1 ) { 
        openModal(modalSelector, modalTimerId);
        window.removeEventListener('scroll',showModalByScroll); 
        }
      }
      window.addEventListener('scroll',showModalByScroll)

   }

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

// а вызов модального окна экспортирую в forms.js таи их импртирую
 // можно и так  export {colseModalWindow , openModal}

    

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
  // slider - пример #2 Ивана. Тпа карусели, как в СликСлайдере

  function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // тут нет разницы какой порядок т.к. я их буду помещать в виде свойств объекта и значений к нему  в вызове slider({}) script.js это, как в slick slider 
    const slides = document.querySelectorAll(slide), // slide = '.offer__slide'
        slider = document.querySelector(container), // container = '.offer__slider'
        prev = document.querySelector(prevArrow), // prevArrow '.offer__slider-prev'
        next = document.querySelector(nextArrow), // nextArrow = '.offer__slider-next'
        total = document.querySelector(totalCounter), // totalCounter = '#total'
        current = document.querySelector(currentCounter), // currentCounter ='#current'
        slidesWrapper = document.querySelector(wrapper), // wrapper = '.offer__slider-wrapper'
        slidesField = document.querySelector(field), //field = '.offer__slider-inner'
        width = window.getComputedStyle(slidesWrapper).width;

        function widthValue(str) {
          return  +width.replace(/\D/g, '');
        }
      let slideIndex = 1;

      let offset = 0;

      function sliderCountControl() {

        if(slides.length < 10) {
          total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
        } else {
          total.textContent = slides.length;
          current.textContent = slideIndex;
        }
      }
        
      slidesField.style.width = 100 * slides.length + '%';
      slidesField.style.display = 'flex'; 
      slidesField.style.transition = '0.5s all';

      slidesWrapper.style.overflow = 'hidden';

      slides.forEach(slide => {
        slide.style.width = width;
      });

      slider.style.position = 'relative'; 
      const indicators = document.createElement('ol'), 
            dots = []; 
      indicators.classList.add('carousel-indicators'); 
      indicators.style.cssText = `
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 15;
          display: flex;
          justify-content: center;
          margin-right: 15%;
          margin-left: 15%;
          list-style: none;
      `;
      slider.append(indicators); 

      for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1); 
        dot.style.cssText = `
          box-sizing: content-box;
          flex: 0 1 auto;
          width: 30px;
          height: 6px;
          margin-right: 3px;
          margin-left: 3px;
          cursor: pointer;
          background-color: #fff;
          background-clip: padding-box;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          opacity: .5;
          transition: opacity .6s ease;
        `;

        if( i == 0) {
          dot.style.opacity = 1;
        }
        indicators.append(dot); 
        dots.push(dot);
      }

      function activeDots() {
        dots.forEach(dot => {
          dot.style.opacity = '.5';
        });
        dots[slideIndex - 1].style.opacity = '1';
      }

      next.addEventListener('click', () => {
        if (offset == widthValue(width) * (slides.length - 1)){

        } else {

          offset += widthValue(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex == slides.length) {
          slideIndex = 1;
        } else {
          slideIndex ++;
        }

        sliderCountControl(slideIndex);
        activeDots(dots);
      });


      prev.addEventListener('click', () => {

        if (offset == 0){

          offset = widthValue(width) * (slides.length - 1); 
        } else {

          offset -= widthValue(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
          slideIndex = slides.length;
        } else {
          slideIndex --;
        }
        
        sliderCountControl(slideIndex);
        activeDots(dots);
      });

      dots.forEach(dot => {
        dot.addEventListener('click', (e)=>{
          const slideTo = e.target.getAttribute('data-slide-to');

          slideIndex = slideTo; 

          offset = widthValue(width) * (slideTo - 1);
          slidesField.style.transform = `translateX(-${offset}px)`; 
        sliderCountControl(slideIndex);
        activeDots(dots);

        });

      });

      sliderCountControl(); 

  }
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// табы

function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
   const tabs = document.querySelectorAll(tabsSelector), //('.tabheader__item')
      tabsContent = document.querySelectorAll(tabsContentSelector), //('.tabcontent')
      tabsParent = document.querySelector(tabsParentSelector); //('.tabheader__items')

      function hideTabContent(params) {
        tabsContent.forEach(item => {
          item.classList.add('hide');
          item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
          item.classList.remove(activeClass);//('tabheader__item_active')
        });
      } 
      
      function showTabcontent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add(activeClass);//('tabheader__item_active')
      }

    hideTabContent();
    showTabcontent();

    tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if(target && target.classList.contains(tabsSelector.slice(1))) {
      //target.classList.contains('.tabheader__item')) замена на target.classList.contains(tabsSelector.slice(1))). Слайс для того, чтобы убрать точку т.к. использую .classList.contains, а точка даст ошибку

      tabs.forEach((item, i) => {
        if (target == item) {
            hideTabContent();
            showTabcontent(i);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// таймер
  function timer(id, deadLine) {
     // const deadLine = '2024-07-29'; теперь эта переменная не нужна, я её укажу в timer(); в scripts.js

    function getTimeRemaining(endtime) {
      let days, hours, minutes, seconds;
      const t = Date.parse(endtime) - Date.parse(new Date()); 
  
      if( t <= 0 ) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
      } else {
        days = Math.floor(t / (1000 * 60 * 60 * 24 )),
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / 1000 / 60) % 60), 
        seconds = Math.floor((t / 1000) % 60); 
      }


      return { 
        'total' : t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }

    function getZero(num) { 
      if ( num >= 0 && num < 10) { 
        return `0${num}`;
      } else { 
        return num; 
      }
    }

    function setClock(selector, endtime) { 
      const timer = document.querySelector(selector), 
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000); 

        updateClock(); 

      function updateClock() { 
        const t = getTimeRemaining(endtime); 
        
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
          clearInterval(timeInterval);
        }
      }
    }

    setClock(id, '31-12-2024');
  }
  
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/servises/servises.js":
/*!*********************************!*\
  !*** ./js/servises/servises.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });


    const postData = async (url, data) => { 
      let res = await fetch(url, { 
          method: "POST",  
          headers: { 
          'Content-type': 'application/json'
          },
          body: data, 
      });

      return await res.json(); 

    };


  const getResource = async (url) => {
  const res = await fetch(url); 

  if(!res.ok) {// если НЕ ок
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();

  };

    
    


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
// мне нужно ипортировать все модули до того, как загрузиться вся страничка









window.addEventListener('DOMContentLoaded', () => {
  // setTimeout я передаю функцию колбек которая запуститься через 50000мс, которая внутри себя имеет функцию вызова модального окна первым агрументов предаю само окно по класу или id или ещё как-то и передаю вызов самого таймера и openModal должен быть имортирован т.к. в modal.js оно вынесено за общий импорт т.к. она долджна работать не зависимо
  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 50000); 

  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active' ); 
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimerId); 
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2020-06-11'); // '.timer' - это элемент на странице и id в модуле, а '2020-06-11' - deadLine
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])(); 
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])(); 
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId); // сюда тоже надо передать modalTimerId т.к. он содержит обнуление таймера. А по скольку в форме тоже открывается модальне окно и чтобы таймер не начал произвольно работать, то нужно в его туда передать в качестве аргумента
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
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

 

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
