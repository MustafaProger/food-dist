function animation() {
    const buttons = document.querySelectorAll('a[href^="#"]'); // Получаем все ссылки, ведущие на якорные блоки

    buttons.forEach(btn => {
        btn.addEventListener('click', (event) => {
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

export default animation;