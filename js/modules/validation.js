export default function validation(form, inputName, inputPhone, inputPassword, inputEmail) {
    const nameInput = form.querySelector(inputName);
    const phoneInput = form.querySelector(inputPhone);
    const passwordInput = form.querySelector(inputPassword);
    const emailInput = form.querySelector(inputEmail);

    let isValid = true;

    let message = {
        name: {
            required: 'Введите имя пользователя',
            minLength: 'Введите не менее 2 символов',
            correct: 'Имя не должно содержать цифр'
        },
        phone: {
            required: 'Введите номер телефона',
            minLength: 'Введите не менее 11 символов',
            correct: 'Номер не должен содержать буквы',
        },
        email: {
            required: 'Введите электронную почту',
            correct: 'Введите корректный email'
        }
    }

    let { name, phone, email } = message;

    errorWork(nameInput, 'name', 2, /\d/, name);
    

    if (passwordInput) {
        passwordErrorWork();
    } else if (emailInput) {
        emailErrorWork();
    } else if (phoneInput) {
        errorWork(phoneInput, 'phone', 11, /\D/, phone)
    }

    return isValid;

    function errorWork(input, classError, length, regex, message) {
        createError(input, classError);
        const error = form.querySelector(`.${classError}__error`);

        const validateField = () => {
            validationNamePhone(input, error, length, regex, message);
        };

        input.removeEventListener('input', validateField);
        input.addEventListener('input', validateField);
        validateField();
    }

    function emailErrorWork() {
        createError(emailInput, 'email');
        const emailError = form.querySelector('.email__error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const validateEmailField = () => {
            validationEmail(emailInput, emailError, emailRegex, email);
        };

        emailInput.removeEventListener('input', validateEmailField);
        emailInput.addEventListener('input', validateEmailField);
        validateEmailField();
    }

    function passwordErrorWork() {
        const passwordErrors = form.querySelectorAll('.password__error');

        const validatePasswordField = () => {
            validatePassword(passwordInput, passwordErrors);
        };

        passwordInput.removeEventListener('input', validatePasswordField);
        passwordInput.addEventListener('input', validatePasswordField);
        validatePasswordField();
    }

    function validationNamePhone(input, error, length, regex, message) {
        let fieldIsValid = true;

        if (input.value.trim() === '') {
            error.innerHTML = message.required;
            error.style.display = 'block';
            fieldIsValid = false;
        } else if (regex.test(input.value)) {
            error.innerHTML = message.correct;
            error.style.display = 'block';
            fieldIsValid = false;
        } else if (input.value.length < length) {
            error.innerHTML = message.minLength;
            error.style.display = 'block';
            fieldIsValid = false;
        } else {
            error.style.display = 'none';
        }

        if (!fieldIsValid) isValid = false;
    }

    function validationEmail(input, error, regex, message) {
        let fieldIsValid = true;

        if (input.value.trim() === '') {
            error.innerHTML = message.required;
            error.style.display = 'block';
            fieldIsValid = false;
        } else if (!regex.test(input.value)) {
            error.innerHTML = message.correct;
            error.style.display = 'block';
            fieldIsValid = false;
        } else {
            error.style.display = 'none';
        }

        if (!fieldIsValid) isValid = false;
    }

    function validatePassword(input, errors) {
        const validations = [{
                regex: /.{8,}/,
                element: errors[0]
            },
            {
                regex: /[A-ZА-ЯЁ]/,
                element: errors[1]
            },
            {
                regex: /[a-zа-яё]/,
                element: errors[2]
            },
            {
                regex: /[0-9]/,
                element: errors[3]
            },
            {
                regex: /[!@#$%^&*(),.?":{}|<>]/,
                element: errors[4]
            }
        ];

        validations.forEach(({ regex, element }) => {
            if (regex.test(input.value)) {
                element.style.color = 'green';
            } else {
                isValid = false;
                element.style.color = 'rgba(255, 60, 0, 1)';
            }
        });
    }

    function createError(input, name) {
        let error = form.querySelector(`.${name}__error`);
        if (!error) {
            error = document.createElement('span');
            error.classList.add('error', `${name}__error`);
            error.style.display = 'none';
            input.insertAdjacentElement('afterend', error);
        }
    }
}