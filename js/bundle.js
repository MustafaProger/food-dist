/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/animation.js":
/*!*********************************!*\
  !*** ./js/modules/animation.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function animation() {
  const buttons = document.querySelectorAll('a[href^="#"]'); // Получаем все ссылки, ведущие на якорные блоки

  buttons.forEach(btn => {
    btn.addEventListener('click', event => {
      event.preventDefault(); // Отменяем стандартное поведение ссылки

      const blockID = btn.getAttribute('href').substring(1); // Получаем ID блока, к которому нужно прокрутить
      const block = document.getElementById(blockID); // Находим блок по ID

      if (block) {
        const targetPosition = block.getBoundingClientRect().top + window.pageYOffset; // Позиция блока
        const startPosition = window.pageYOffset; // Текущая позиция прокрутки
        const distance = targetPosition - startPosition; // Расстояние до блока
        const duration = 1000; // Продолжительность анимации в миллисекундах
        let startTime = null;

        // Функция анимации
        function scrollAnimation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = ease(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(scrollAnimation);
        }

        // Функция плавности анимации (easing function)
        function ease(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
        }
        requestAnimationFrame(scrollAnimation);
      }
    });
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (animation);

/***/ }),

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  const genders = document.querySelectorAll('#gender .calculating__choose-item'),
    activity = document.querySelectorAll('#activity .calculating__choose-item'),
    male = document.querySelector('#male'),
    female = document.querySelector('#female'),
    height = document.querySelector('#height'),
    weight = document.querySelector('#weight'),
    age = document.querySelector('#age'),
    resultСalories = document.querySelector('.calculating__result span');

  // Это числа, которые пригодятся нам при расчете BMR
  // genderCoefficient отвечает за гендер, то есть какой гендер, такой и коэффицент
  // activityCoefficient отвечает за активность, то есть чем больще активность, тем больше коэффицент

  const coefficients = {
    genderCoefficient: 447.6,
    activityCoefficient: 1.375
  };

  // Делаем результат калорий в 0, так как у нас нет никаких данных
  resultСalories.innerHTML = 0;

  // Это функция помогает нам переключаться между кнопками "пол" и "активность" и берет их data-атрибут, добавляя его в object 
  function activateElementsAndGetCoefficient(nodeList, className, coefficientObject, coefficientKey) {
    nodeList.forEach((item, index) => {
      item.addEventListener('click', () => {
        nodeList.forEach(el => el.classList.remove(className));
        item.classList.add(className);
        coefficientObject[coefficientKey] = +item.dataset.coefficient;

        // Сохранение того, какую активность выбрал пользователь
        // Этот функционал сделал чуть криво
        if (nodeList.length === 4) {
          nodeList.forEach((item, index) => {
            if (item.classList.contains(className)) localStorage.setItem('activity', index);
          });
        }
        calculateBMR();
      });
    });
  }
  activateElementsAndGetCoefficient(genders, 'calculating__choose-item_active', coefficients, 'genderCoefficient');
  activateElementsAndGetCoefficient(activity, 'calculating__choose-item_active', coefficients, 'activityCoefficient');
  function loadSavedValues() {
    const savedHeight = localStorage.getItem('height'),
      savedWeight = localStorage.getItem('weight'),
      savedAge = localStorage.getItem('age'),
      savedGender = localStorage.getItem('gender'),
      savedActivity = localStorage.getItem('activity'),
      savedResultCalories = localStorage.getItem('resultCalories');
    if (savedHeight) height.value = savedHeight;
    if (savedWeight) weight.value = savedWeight;
    if (savedAge) age.value = savedAge;
    if (savedResultCalories) resultСalories.innerHTML = savedResultCalories;
    function localStorageForGendersActivity(nodeList, savedValues) {
      nodeList.forEach((item, index, arr) => {
        if (savedValues == index) {
          arr.forEach(otherEl => otherEl.classList.remove('calculating__choose-item_active'));
          item.classList.add('calculating__choose-item_active');
        }
      });
    }
    localStorageForGendersActivity(genders, savedGender);
    localStorageForGendersActivity(activity, savedActivity);
  }
  loadSavedValues();
  function calculateBMR() {
    let BMR;
    const heightValue = +height.value;
    const weightValue = +weight.value;
    const ageValue = +age.value;
    if (heightValue && weightValue && ageValue) {
      localStorage.setItem('height', +height.value);
      localStorage.setItem('weight', +weight.value);
      localStorage.setItem('age', +age.value);
      if (male.classList.contains('calculating__choose-item_active')) {
        localStorage.setItem('gender', 0);
        BMR = coefficients.genderCoefficient + 13.4 * weightValue + 4.8 * heightValue - 5.7 * ageValue;
      } else if (female.classList.contains('calculating__choose-item_active')) {
        localStorage.setItem('gender', 1);
        BMR = coefficients.genderCoefficient + 9.2 * weightValue + 3.1 * heightValue - 4.3 * ageValue;
      }
      resultСalories.innerHTML = Math.floor(coefficients.activityCoefficient * BMR);
      localStorage.setItem('resultCalories', +resultСalories.innerHTML);
    } else {
      resultСalories.innerHTML = 0;
    }
  }
  height.addEventListener('input', calculateBMR);
  weight.addEventListener('input', calculateBMR);
  age.addEventListener('input', calculateBMR);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
// Урок 78. Используем классы в реальной работе
// Урок 79. Rest оператор и параметры по умолчанию (ES6)
// Урок 90. Дополнительно: Что такое библиотеки. Библиотека axios

function cards() {
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 95;
      this.changeToUAH();
    }
    changeToUAH() {
      this.price = this.price * this.transfer;
    }
    render() {
      const element = document.createElement('div');
      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
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
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
      this.parent.append(element);
    }
  }

  // getResource('http://localhost:3000/menu')
  //     .then(data => {
  //         const menuItem = data.menu;

  //         menuItem.forEach(({img, altimg, title, descr, price}) => {
  //             new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
  //         });
  //     });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./validation */ "./js/modules/validation.js");


function forms(formSelector, modalSelector, messageSelector, btnCloseSelector) {
  const forms = document.querySelectorAll(formSelector),
    modal = document.querySelector(modalSelector),
    message = document.querySelector(messageSelector),
    btnClose = document.querySelectorAll(btnCloseSelector);
  btnClose.forEach(closer => {
    closer.addEventListener('click', () => {
      message.classList.remove('success');
      message.classList.remove('failure');
      document.body.classList.remove('fixed');
    });
  });
  forms.forEach(item => {
    bindPostData(item);
  });
  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const isValid = (0,_validation__WEBPACK_IMPORTED_MODULE_1__["default"])(form, '.input-name', '.input-phone', '.input-password', '.input-email');
      if (isValid) {
        document.body.classList.add('sending');
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
        (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)('https://jsonplaceholder.typicode.com/posts', json).then(() => {
          closeModal();
          message.classList.add('success');
        }).catch(() => {
          closeModal();
          message.classList.add('failure');
        }).finally(() => {
          form.reset();
        });
      } else {
        console.log('Ошибка валидации формы');
      }
    });
  }
  function closeModal() {
    document.body.classList.remove('sending');
    modal.classList.remove('modal-open');
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Урок 71. Создаем модальное окно
// Урок 72. Модификации модального окна

function modal(btnOpenSelector, btnCloseSelector, modalSelector) {
  const btnOpen = document.querySelectorAll(btnOpenSelector),
    btnClose = document.querySelector(btnCloseSelector),
    modal = document.querySelector(modalSelector);

  // const modalTimerID = setTimeout(openModal, modalTimer);

  function closeModal() {
    modal.classList.remove('modal-open');
    document.body.classList.remove('fixed');
  }
  function openModal() {
    modal.classList.add('modal-open');
    document.body.classList.add('fixed');
  }
  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  btnOpen.forEach(item => {
    item.addEventListener('click', () => openModal());
  });
  btnClose.addEventListener('click', () => closeModal());
  modal.addEventListener('click', event => {
    if (event.target.className == 'modal modal-open') closeModal();
  });
  document.addEventListener('keydown', function (event) {
    if (event.code == 'Escape' && modal.classList.contains('modal-open')) closeModal();
  });
  window.addEventListener('scroll', showModalByScroll);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/phoneinput.js":
/*!**********************************!*\
  !*** ./js/modules/phoneinput.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function phoneInput() {
  let phoneInputs = document.querySelectorAll('input[data-tel-input]');
  let getInputNumbersValue = function (input) {
    // Return stripped input value — just numbers
    return input.value.replace(/\D/g, '');
  };
  let onPhonePaste = function (e) {
    let input = e.target,
      inputNumbersValue = getInputNumbersValue(input);
    let pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      let pastedText = pasted.getData('Text');
      if (/\D/g.test(pastedText)) {
        // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
        // formatting will be in onPhoneInput handler
        input.value = inputNumbersValue;
        return;
      }
    }
  };
  let onPhoneInput = function (e) {
    let input = e.target,
      inputNumbersValue = getInputNumbersValue(input),
      selectionStart = input.selectionStart,
      formattedInputValue = "";
    if (!inputNumbersValue) {
      return input.value = "";
    }
    if (input.value.length != selectionStart) {
      // Editing in the middle of input, not last symbol
      if (e.data && /\D/g.test(e.data)) {
        // Attempt to input non-numeric symbol
        input.value = inputNumbersValue;
      }
      return;
    }
    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
      let firstSymbols = inputNumbersValue[0] == "8" ? "8" : "+7";
      formattedInputValue = input.value = firstSymbols + " ";
      if (inputNumbersValue.length > 1) {
        formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
  };
  let onPhoneKeyDown = function (e) {
    // Clear input after remove last symbol
    let inputValue = e.target.value.replace(/\D/g, '');
    if (e.keyCode == 8 && inputValue.length == 1) {
      e.target.value = "";
    }
  };
  for (let phoneInput of phoneInputs) {
    phoneInput.addEventListener('keydown', onPhoneKeyDown);
    phoneInput.addEventListener('input', onPhoneInput, false);
    phoneInput.addEventListener('paste', onPhonePaste, false);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (phoneInput);

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Урок 91. Создаем слайдер на сайте, вариант 1

function slider({
  imagesSelector,
  prevSelector,
  nextSelector,
  currentSelector,
  slidesWrapperSelector,
  slidersFieldSelector,
  sliderSelector
}) {
  const images = document.querySelectorAll(imagesSelector),
    prev = document.querySelector(prevSelector),
    next = document.querySelector(nextSelector),
    current = document.querySelector(currentSelector),
    slidesWrapper = document.querySelector(slidesWrapperSelector),
    slidersField = document.querySelector(slidersFieldSelector),
    width = window.getComputedStyle(slidesWrapper).width,
    slider = document.querySelector(sliderSelector);
  let offset = 0;
  let slideIndex = 1;
  slidersField.style.width = 100 * images.length + '%';
  slidersField.style.display = 'flex';
  slidersField.style.transition = '0.5s all';
  slidesWrapper.style.overflow = 'hidden';
  images.forEach(img => {
    img.style.width = width;
  });
  function updateCurrentSlideNumber() {
    if (slideIndex < 10) {
      current.innerHTML = `0${slideIndex}`;
    } else {
      current.innerHTML = slideIndex;
    }
  }
  function moveToSlide(index) {
    offset = +width.slice(0, width.length - 2) * (index - 1);
    slidersField.style.transform = `translateX(-${offset}px)`;
    slideIndex = index;
    updateCurrentSlideNumber();
    activeDot();
  }
  next.addEventListener('click', () => {
    if (offset == +width.slice(0, width.length - 2) * (images.length - 1)) {
      offset = 0;
      slideIndex = 1;
    } else {
      offset += +width.slice(0, width.length - 2);
      slideIndex++;
    }
    updateCurrentSlideNumber();
    activeDot();
    slidersField.style.transform = `translateX(-${offset}px)`;
  });
  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (images.length - 1);
      slideIndex = images.length;
    } else {
      offset -= +width.slice(0, width.length - 2);
      slideIndex--;
    }
    updateCurrentSlideNumber();
    activeDot();
    slidersField.style.transform = `translateX(-${offset}px)`;
  });

  // DOTS

  slider.style.position = 'relative';
  const indicators = document.createElement('ol'),
    dots = [];
  indicators.classList.add('carousel-indicators');
  slider.append(indicators);
  for (let i = 0; i < images.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    if (i == 0) {
      dot.style.opacity = '1';
    }
    indicators.append(dot);
    dots.push(dot);
  }
  function activeDot() {
    dots.forEach(dot => dot.style.opacity = '0.5');
    dots[slideIndex - 1].style.opacity = '1';
  }
  dots.forEach(dot => {
    dot.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to');
      moveToSlide(slideTo);
    });
  });
  updateCurrentSlideNumber();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Урок 63. Создаем табы в новом проекте

function tabs(tabContentSelector, tabheaderItemSelector, tabheaderParentSelector, classDisctive, classActive) {
  const tabContent = document.querySelectorAll(tabContentSelector),
    tabheaderItem = document.querySelectorAll(`.${tabheaderItemSelector}`),
    tabheaderParent = document.querySelector(tabheaderParentSelector);
  function showTabContent(i = 0) {
    tabContent.forEach((item, index) => {
      if (i === index) {
        item.classList.remove(classDisctive);
      } else {
        item.classList.add(classDisctive);
      }
    });
  }
  function hideTabContent() {
    tabContent.forEach(item => {
      item.classList.add(classDisctive);
      showTabContent();
    });
  }
  function clickTabContent() {
    tabheaderParent.addEventListener('click', event => {
      const target = event.target;
      if (target && target.classList.contains(tabheaderItemSelector)) {
        tabheaderItem.forEach((item, index) => {
          if (item === target) {
            item.classList.add(classActive);
            showTabContent(index);
          } else {
            item.classList.remove(classActive);
          }
        });
      }
    });
  }
  hideTabContent();
  clickTabContent();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Урок 68. Создаем таймер обратного отсчета на сайте

function timer(deadLine, timeSelector) {
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor(t / (1000 * 60 * 60) % 24),
      minutes = Math.floor(t / 60000 % 60),
      seconds = Math.floor(t / 1000 % 60);
    const date = new Date(deadLine),
      promotionEnd = document.querySelector('.promotion__end');
    promotionEnd.innerHTML = `Акция закончится ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} года в 00:00`;
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = document.querySelector('#days'),
      hours = document.querySelector('#hours'),
      minutes = document.querySelector('#minutes'),
      seconds = document.querySelector('#seconds'),
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
        days.innerHTML = "00";
        hours.innerHTML = "00";
        hours.innerHTML = "00";
        minutes.innerHTML = "00";
        seconds.innerHTML = "00";
      }
    }
  }
  setClock(timeSelector, deadLine);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/modules/validation.js":
/*!**********************************!*\
  !*** ./js/modules/validation.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ validation)
/* harmony export */ });
function validation(form, inputName, inputPhone, inputPassword, inputEmail) {
  const nameInput = form.querySelector(inputName);
  const phoneInput = form.querySelector(inputPhone);
  const passwordInput = form.querySelector(inputPassword);
  const emailInput = form.querySelector(inputEmail);
  let isValid = true;
  let message = {
    name: {
      required: 'Введите имя пользователя',
      minLength: 'Введите не менее 2 символов',
      correct: 'Имя не должно содержать цифр'
    },
    phone: {
      required: 'Введите номер телефона',
      minLength: 'Введите не менее 11 символов',
      correct: 'Номер не должен содержать буквы'
    },
    email: {
      required: 'Введите электронную почту',
      correct: 'Введите корректный email'
    }
  };
  let {
    name,
    phone,
    email
  } = message;
  errorWork(nameInput, 'name', 2, /\d/, name);
  if (passwordInput) {
    passwordErrorWork();
  } else if (emailInput) {
    emailErrorWork();
  } else if (phoneInput) {
    errorWork(phoneInput, 'phone', 11, /\D/, phone);
  }
  return isValid;
  function errorWork(input, classError, length, regex, message) {
    createError(input, classError);
    const error = form.querySelector(`.${classError}__error`);
    const validateField = () => {
      validationNamePhone(input, error, length, regex, message);
    };
    input.removeEventListener('input', validateField);
    input.addEventListener('input', validateField);
    validateField();
  }
  function emailErrorWork() {
    createError(emailInput, 'email');
    const emailError = form.querySelector('.email__error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validateEmailField = () => {
      validationEmail(emailInput, emailError, emailRegex, email);
    };
    emailInput.removeEventListener('input', validateEmailField);
    emailInput.addEventListener('input', validateEmailField);
    validateEmailField();
  }
  function passwordErrorWork() {
    const passwordErrors = form.querySelectorAll('.password__error');
    const validatePasswordField = () => {
      validatePassword(passwordInput, passwordErrors);
    };
    passwordInput.removeEventListener('input', validatePasswordField);
    passwordInput.addEventListener('input', validatePasswordField);
    validatePasswordField();
  }
  function validationNamePhone(input, error, length, regex, message) {
    let fieldIsValid = true;
    if (input.value.trim() === '') {
      error.innerHTML = message.required;
      error.style.display = 'block';
      fieldIsValid = false;
    } else if (regex.test(input.value)) {
      error.innerHTML = message.correct;
      error.style.display = 'block';
      fieldIsValid = false;
    } else if (input.value.length < length) {
      error.innerHTML = message.minLength;
      error.style.display = 'block';
      fieldIsValid = false;
    } else {
      error.style.display = 'none';
    }
    if (!fieldIsValid) isValid = false;
  }
  function validationEmail(input, error, regex, message) {
    let fieldIsValid = true;
    if (input.value.trim() === '') {
      error.innerHTML = message.required;
      error.style.display = 'block';
      fieldIsValid = false;
    } else if (!regex.test(input.value)) {
      error.innerHTML = message.correct;
      error.style.display = 'block';
      fieldIsValid = false;
    } else {
      error.style.display = 'none';
    }
    if (!fieldIsValid) isValid = false;
  }
  function validatePassword(input, errors) {
    const validations = [{
      regex: /.{8,}/,
      element: errors[0]
    }, {
      regex: /[A-ZА-ЯЁ]/,
      element: errors[1]
    }, {
      regex: /[a-zа-яё]/,
      element: errors[2]
    }, {
      regex: /[0-9]/,
      element: errors[3]
    }, {
      regex: /[!@#$%^&*(),.?":{}|<>]/,
      element: errors[4]
    }];
    validations.forEach(({
      regex,
      element
    }) => {
      if (regex.test(input.value)) {
        element.style.color = 'green';
      } else {
        isValid = false;
        element.style.color = 'rgba(255, 60, 0, 1)';
      }
    });
  }
  function createError(input, name) {
    let error = form.querySelector(`.${name}__error`);
    if (!error) {
      error = document.createElement('span');
      error.classList.add('error', `${name}__error`);
      error.style.display = 'none';
      input.insertAdjacentElement('afterend', error);
    }
  }
}

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });
  if (!result.ok) {
    throw new Error(`Could not post ${url}, status: ${result.status}`);
  }
  return await result.json();
};
const getResource = async url => {
  const result = await fetch(url);
  if (!result.ok) {
    throw new Error(`Could not fetch ${url}, status: ${result.status}`);
  }
  return await result.json();
};


/***/ }),

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	0;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    var then$$1 = void 0;
    try {
      then$$1 = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then$$1);
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = true;

  if (hasCallback) {
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = void 0;
      var error = void 0;
      var didError = false;
      try {
        _then = entry.then;
      } catch (e) {
        didError = true;
        error = e;
      }

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        if (didError) {
          reject(promise, error);
        } else {
          handleMaybeThenable(promise, entry, _then);
        }
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof __webpack_require__.g !== 'undefined') {
    local = __webpack_require__.g;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map


/***/ }),

/***/ "./node_modules/nodelist-foreach-polyfill/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/nodelist-foreach-polyfill/index.js ***!
  \*********************************************************/
/***/ (() => {

if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nodelist-foreach-polyfill */ "./node_modules/nodelist-foreach-polyfill/index.js");
/* harmony import */ var nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nodelist_foreach_polyfill__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_animation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/animation */ "./js/modules/animation.js");
/* harmony import */ var _modules_phoneinput__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/phoneinput */ "./js/modules/phoneinput.js");
(__webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js").polyfill)();










window.addEventListener('DOMContentLoaded', () => {
  (0,_modules_animation__WEBPACK_IMPORTED_MODULE_8__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])('form', '.modal', '.message', '[data-close]');
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])('[data-modal]', '[data-close]', '.modal');
  // phoneInput();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
    imagesSelector: '.offer__slide',
    prevSelector: '.offer__slider-prev',
    nextSelector: '.offer__slider-next',
    currentSelector: '#current',
    slidesWrapperSelector: '.offer__slider-wrapper',
    slidersFieldSelector: '.offer_slider-inner',
    sliderSelector: '.offer__slider'
  });
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_6__["default"])('.tabcontent', 'tabheader__item', '.tabheader', 'hide-content', 'tabheader__item_active');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_7__["default"])('2025-01-7', '.timer');
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map