window.addEventListener('DOMContentLoaded', function () {
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
        postData(item);
    })

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            document.body.classList.add('sending');

            const formData = new FormData(form);

            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            fetch('php/server.php', {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(object)
                })
                .then(() => {
                    closeModal()
                    newmodal.classList.add('success');
                }).catch(() => {
                    closeModal()
                    newmodal.classList.add('failure');
                }).finally(() => {
                    form.reset()
                })
        })
    }

    function closeModal() {
        document.body.classList.remove('sending');
        modal.classList.remove('modal-open');
    }
})