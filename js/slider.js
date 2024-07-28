// Урок 91. Создаем слайдер на сайте, вариант 1

window.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidersField = document.querySelector('.offer_slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width;

    let offset = 0;

    slidersField.style.width = 100 * images.length + '%';

    slidersField.style.display = 'flex';
    slidersField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden'

    images.forEach(img => {
        img.style.width = width;
    });

    next.addEventListener('click', () => {

        if (offset == +width.slice(0, width.length - 2) * (images.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2)
        }

        if (current.innerHTML == `0${images.length}`) {
            current.innerHTML = `01`
        } else {
            current.innerHTML = `0${+current.innerHTML + 1}`
        }

        slidersField.style.transform = `translateX(-${offset}px)`
    });

    prev.addEventListener('click', () => {

        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (images.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2)
        }

        if (current.innerHTML == '01') {
            current.innerHTML = `0${images.length}`
        } else {
            current.innerHTML = `0${+current.innerHTML - 1}`
        }

        slidersField.style.transform = `translateX(-${offset}px)`
    })
})