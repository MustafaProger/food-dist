// Урок 91. Создаем слайдер на сайте, вариант 1

window.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current');

    next.addEventListener('click', () => {
        if (current.innerHTML == '04') {
            current.innerHTML = `01`
        } else {
            current.innerHTML = `0${+current.innerHTML + 1}`
        }
        showSlide();
    })

    prev.addEventListener('click', () => {
        if (current.innerHTML == '01') {
            current.innerHTML = `04`
        } else {
            current.innerHTML = `0${+current.innerHTML - 1}`
        }
        showSlide();
    })

    function showSlide() {
        images.forEach(img => img.style.display = 'none');
        images[+current.innerHTML - 1].style.display = 'block';
    }

})