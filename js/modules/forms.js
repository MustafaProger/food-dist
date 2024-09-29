import {
    postData
} from "../services/services";
import validation from "./validation";

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

            const isValid = validation(form, '.input-name', '.input-phone', '.input-password', '.input-email')

            if (isValid) {
                document.body.classList.add('sending');

                const formData = new FormData(form);

                const json = JSON.stringify(Object.fromEntries(formData.entries()));

                postData('http://localhost:3000/requests', json)
                    .then(() => {
                        closeModal();
                        message.classList.add('success');
                    }).catch(() => {
                        closeModal();
                        message.classList.add('failure');
                    }).finally(() => {
                        form.reset();
                    })
            } else {
                console.log('Ошибка валидации формы');
            }
        })
    }

    function closeModal() {
        document.body.classList.remove('sending');
        modal.classList.remove('modal-open');
    }
}

export default forms;