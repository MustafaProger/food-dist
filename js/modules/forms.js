// Урок 86. Fetch API
// Урок 89. Получение данных с сервера. Async/Await (ES8)

import { postData } from "../services/services";

function forms() {
    const forms = document.querySelectorAll('form'),
        modal = document.querySelector('.modal'),
        newmodal = document.querySelector('.newmodal'),
        btnClose = document.querySelectorAll('[data-close]');

    btnClose.forEach(closer => {
        closer.addEventListener('click', () => {
            newmodal.classList.remove('success');
            newmodal.classList.remove('failure');
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

            postData('http://localhost:3000/requests', json)
                .then(() => {
                    closeModal();
                    newmodal.classList.add('success');
                }).catch(() => {
                    closeModal();
                    newmodal.classList.add('failure');
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