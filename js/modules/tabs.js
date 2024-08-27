// Урок 63. Создаем табы в новом проекте

function tabs(tabContentSelector, tabheaderItemSelector, tabheaderParentSelector, classDisctive, classActive) {
    
    const tabContent = document.querySelectorAll(tabContentSelector),
        tabheaderItem = document.querySelectorAll(`.${tabheaderItemSelector}`),
        tabheaderParent = document.querySelector(tabheaderParentSelector);

    function showTabContent(i = 0) {
        tabContent.forEach((item, index) => {
            if (i === index) {
                item.classList.remove(classDisctive);
            } else {
                item.classList.add(classDisctive);
            }
        })
    }

    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add(classDisctive);
            showTabContent();
        })
    }

    function clickTabContent() {
        tabheaderParent.addEventListener('click', (event) => {
            const target = event.target;
            if (target && target.classList.contains(tabheaderItemSelector)) {
                tabheaderItem.forEach((item, index) => {
                    if (item === target) {
                        item.classList.add(classActive);
                        showTabContent(index)
                    } else {
                        item.classList.remove(classActive);
                    }
                })
            }
        })
    }

    hideTabContent()
    clickTabContent()

}

export default tabs;