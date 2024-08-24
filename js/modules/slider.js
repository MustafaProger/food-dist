// Урок 91. Создаем слайдер на сайте, вариант 1

function slider() {

    const images = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidersField = document.querySelector('.offer_slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width,
        slider = document.querySelector('.offer__slider');

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

export default slider;