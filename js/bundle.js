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
                        if (item.classList.contains(className)) localStorage.setItem('activity', index)
                    })
                }
                calculateBMR()
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
        if (savedResultCalories) resultСalories.innerHTML = savedResultCalories

        function localStorageForGendersActivity(nodeList, savedValues) {
            nodeList.forEach((item, index, arr) => {
                if (savedValues == index) {
                    arr.forEach(otherEl => otherEl.classList.remove('calculating__choose-item_active'));
                    item.classList.add('calculating__choose-item_active');
                }
            })
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
                BMR = coefficients.genderCoefficient + (13.4 * weightValue) + (4.8 * heightValue) - (5.7 * ageValue);
            } else if (female.classList.contains('calculating__choose-item_active')) {
                localStorage.setItem('gender', 1);
                BMR = coefficients.genderCoefficient + (9.2 * weightValue) + (3.1 * heightValue) - (4.3 * ageValue);
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

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
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
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
// Урок 86. Fetch API
// Урок 89. Получение данных с сервера. Async/Await (ES8)



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
        })
    })

    forms.forEach(item => {
        bindPostData(item);
    })

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            document.body.classList.add('sending');

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.postData)('http://localhost:3000/requests', json)
                .then(() => {
                    closeModal();
                    message.classList.add('success');
                }).catch(() => {
                    closeModal();
                    message.classList.add('failure');
                }).finally(() => {
                    form.reset();
                })
        })
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Урок 71. Создаем модальное окно
// Урок 72. Модификации модального окна

function modal(btnOpenSelector, btnCloseSelector, modalSelector, modalTimer) {
    const btnOpen = document.querySelectorAll(btnOpenSelector),
        btnClose = document.querySelector(btnCloseSelector),
        modal = document.querySelector(modalSelector);

    const modalTimerID = setTimeout(openModal, modalTimer);

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

    btnOpen.forEach((item) => {
        item.addEventListener('click', () => openModal())
    })

    btnClose.addEventListener('click', () => closeModal())

    modal.addEventListener('click', (event) => {
        if (event.target.className == 'modal modal-open') closeModal()
    })

    document.addEventListener('keydown', function (event) {
        if (event.code == 'Escape' && modal.classList.contains('modal-open')) closeModal()
    })

    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

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
// Урок 91. Создаем слайдер на сайте, вариант 1

function slider({imagesSelector, prevSelector, nextSelector, currentSelector, slidesWrapperSelector, slidersFieldSelector, sliderSelector}) {
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
        dot.addEventListener('click', (e) => {
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
        })
    }

    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add(classDisctive);
            showTabContent();
        })
    }

    function clickTabContent() {
        tabheaderParent.addEventListener('click', (event) => {
            const target = event.target;
            if (target && target.classList.contains(tabheaderItemSelector)) {
                tabheaderItem.forEach((item, index) => {
                    if (item === target) {
                        item.classList.add(classActive);
                        showTabContent(index)
                    } else {
                        item.classList.remove(classActive);
                    }
                })
            }
        })
    }

    hideTabContent()
    clickTabContent()

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
// Урок 68. Создаем таймер обратного отсчета на сайте

function timer(deadLine, timeSelector) {

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 60000) % 60),
            seconds = Math.floor((t / 1000) % 60);

        const date = new Date(deadLine),
            promotionEnd = document.querySelector('.promotion__end');

        promotionEnd.innerHTML = `Акция закончится ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} года в 00:00`;

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = document.querySelector('#days'),
            hours = document.querySelector('#hours'),
            minutes = document.querySelector('#minutes'),
            seconds = document.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock()

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

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getResource: () => (/* binding */ getResource),
/* harmony export */   postData: () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) => {
    const result = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json',
        },
        body: data
    });

    if (!result.ok) {
        throw new Error(`Could not post ${url}, status: ${result.status}`);
    }

    return await result.json();
};

const getResource = async (url) => {
    const result = await fetch(url);

    if (!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`)
    }

    return await result.json()
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
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");








window.addEventListener('DOMContentLoaded', () => {
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('form', '.modal', '.message', '[data-close]');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', '[data-close]', '.modal', 30000);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
        imagesSelector: '.offer__slide',
        prevSelector: '.offer__slider-prev',
        nextSelector: '.offer__slider-next',
        currentSelector: '#current',
        slidesWrapperSelector: '.offer__slider-wrapper',
        slidersFieldSelector: '.offer_slider-inner',
        sliderSelector: '.offer__slider' 
    });
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabcontent', 'tabheader__item', '.tabheader', 'hide-content', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('2024-12-12', '.timer');
})
/******/ })()
;
//# sourceMappingURL=bundle.js.map