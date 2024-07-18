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

            const request = new XMLHttpRequest();
            request.open('POST', 'php/server.php');
            request.setRequestHeader('Content-type', 'application/json');

            const formData = new FormData(form);

            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });
            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    document.body.classList.remove('sending');
                    modal.classList.remove('modal-open');
                    newmodal.classList.add('success');

                    console.log(request.response);
                    form.reset();

                } else {
                    document.body.classList.remove('sending');
                    modal.classList.remove('modal-open');
                    newmodal.classList.add('failure');
                }

            })
        })
    }
})