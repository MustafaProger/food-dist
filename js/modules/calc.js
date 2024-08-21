function calc() {
    const genders = document.querySelectorAll('#gender .calculating__choose-item'),
        activity = document.querySelectorAll('#activity .calculating__choose-item'),
        male = document.querySelector('#male'),
        female = document.querySelector('#female'),
        height = document.querySelector('#height'),
        weight = document.querySelector('#weight'),
        age = document.querySelector('#age'),
        resultСalories = document.querySelector('.calculating__result span');

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
        nodeList.forEach((item, index) => {
            item.addEventListener('click', () => {
                nodeList.forEach(el => el.classList.remove(className));
                item.classList.add(className);
                coefficientObject[coefficientKey] = +item.dataset.coefficient;

                // Сохранение того, какую активность выбрал пользователь
                // Этот функционал сделал чуть криво
                if (nodeList.length === 4) {
                    nodeList.forEach((item, index) => {
                        if (item.classList.contains(className)) localStorage.setItem('activity', index)
                    })
                }
                calculateBMR()
            });
        });
    }

    activateElementsAndGetCoefficient(genders, 'calculating__choose-item_active', coefficients, 'genderCoefficient');
    activateElementsAndGetCoefficient(activity, 'calculating__choose-item_active', coefficients, 'activityCoefficient');

    function loadSavedValues() {
        const savedHeight = localStorage.getItem('height'),
            savedWeight = localStorage.getItem('weight'),
            savedAge = localStorage.getItem('age'),
            savedGender = localStorage.getItem('gender'),
            savedActivity = localStorage.getItem('activity'),
            savedResultCalories = localStorage.getItem('resultCalories');

        if (savedHeight) height.value = savedHeight;
        if (savedWeight) weight.value = savedWeight;
        if (savedAge) age.value = savedAge;
        if (savedResultCalories) resultСalories.innerHTML = savedResultCalories

        function localStorageForGendersActivity(nodeList, savedValues) {
            nodeList.forEach((item, index, arr) => {
                if (savedValues == index) {
                    arr.forEach(otherEl => otherEl.classList.remove('calculating__choose-item_active'));
                    item.classList.add('calculating__choose-item_active');
                }
            })
        }

        localStorageForGendersActivity(genders, savedGender);
        localStorageForGendersActivity(activity, savedActivity);

    }

    loadSavedValues();

    function calculateBMR() {
        let BMR;
        const heightValue = +height.value;
        const weightValue = +weight.value;
        const ageValue = +age.value;

        if (heightValue && weightValue && ageValue) {

            localStorage.setItem('height', +height.value);
            localStorage.setItem('weight', +weight.value);
            localStorage.setItem('age', +age.value);

            if (male.classList.contains('calculating__choose-item_active')) {
                localStorage.setItem('gender', 0);
                BMR = coefficients.genderCoefficient + (13.4 * weightValue) + (4.8 * heightValue) - (5.7 * ageValue);
            } else if (female.classList.contains('calculating__choose-item_active')) {
                localStorage.setItem('gender', 1);
                BMR = coefficients.genderCoefficient + (9.2 * weightValue) + (3.1 * heightValue) - (4.3 * ageValue);
            }
            resultСalories.innerHTML = Math.floor(coefficients.activityCoefficient * BMR);
            localStorage.setItem('resultCalories', +resultСalories.innerHTML);
        } else {
            resultСalories.innerHTML = 0;
        }
    }

    height.addEventListener('input', calculateBMR);
    weight.addEventListener('input', calculateBMR);
    age.addEventListener('input', calculateBMR);
}

module.exports = calc;