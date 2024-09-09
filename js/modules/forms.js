// Урок 86. Fetch API
// Урок 89. Получение данных с сервера. Async/Await (ES8)

import { postData } from "../services/services";

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

            postData('https://jsonplaceholder.typicode.com/posts', json)
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

export default forms;