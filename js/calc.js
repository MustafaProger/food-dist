window.addEventListener('DOMContentLoaded', () => {
    const genders = document.querySelectorAll('#gender .calculating__choose-item'),
        male = document.querySelector('#male'),
        female = document.querySelector('#female'),
        height = document.querySelector('#height'),
        weight = document.querySelector('#weight'),
        age = document.querySelector('#age'),
        resultСalories = document.querySelector('.calculating__result span'),
        activity = document.querySelectorAll('#activity .calculating__choose-item');

    // Это числа, которые пригодятся нам при расчете BMR
    // genderCoefficient отвечает за гендер, то есть какой гендер, такой и коэффицент
    // activityCoefficient отвечает за активность, то есть чем больще активность, тем больше коэффицент

    const coefficients = {
        genderCoefficient: 447.6,
        activityCoefficient: 1.375
    };

    // Делаем результат калорий в 0, так как у нас нет никаких данных
    resultСalories.innerHTML = 0;

    // Это функция помогает нам переключаться между кнопками "пол" и "активность" и берет их data-атрибут, добавляя его в object 
    function activateElementsAndGetCoefficient(nodeList, className, coefficientObject, coefficientKey) {
        nodeList.forEach(item => {
            item.addEventListener('click', () => {
                nodeList.forEach(el => el.classList.remove(className));
                item.classList.add(className);
                coefficientObject[coefficientKey] = +item.dataset.coefficient;
                calculateBMR()
            });
        });
    }

    activateElementsAndGetCoefficient(genders, 'calculating__choose-item_active', coefficients, 'genderCoefficient');
    activateElementsAndGetCoefficient(activity, 'calculating__choose-item_active', coefficients, 'activityCoefficient');

    function calculateBMR() {
        let BMR;
        const heightValue = +height.value;
        const weightValue = +weight.value;
        const ageValue = +age.value;

        if (heightValue && weightValue && ageValue) {

            if (male.classList.contains('calculating__choose-item_active')) {
                BMR = coefficients.genderCoefficient + (13.4 * weightValue) + (4.8 * heightValue) - (5.7 * ageValue);
            } else if (female.classList.contains('calculating__choose-item_active')) {
                BMR = coefficients.genderCoefficient + (9.2 * weightValue) + (3.1 * heightValue) - (4.3 * ageValue);
            }
            resultСalories.innerHTML = Math.floor(coefficients.activityCoefficient * BMR);
        } else {
            resultСalories.innerHTML = 0;
        }
    }

    height.addEventListener('input', calculateBMR);
    weight.addEventListener('input', calculateBMR);
    age.addEventListener('input', calculateBMR);
})