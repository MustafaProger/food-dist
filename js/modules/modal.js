// Урок 71. Создаем модальное окно
// Урок 72. Модификации модального окна

function modal() {
    const btnOpen = document.querySelectorAll('[data-modal]'),
        btnClose = document.querySelector('[data-close]'),
        modal = document.querySelector('.modal');

    const modalTimerID = setTimeout(openModal, 5000);

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

export default modal;