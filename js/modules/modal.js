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

export default modal;