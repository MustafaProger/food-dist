// Урок 63. Создаем табы в новом проекте

window.addEventListener('DOMContentLoaded', () => {
    const tabContent = document.querySelectorAll('.tabcontent'),
        tabheaderItem = document.querySelectorAll('.tabheader__item'),
        tabheaderParent = document.querySelector('.tabheader');

    function showTabContent(i = 0) {
        tabContent.forEach((item, index) => {
            if (i === index) {
                item.classList.remove('hide-content');
            } else {
                item.classList.add('hide-content');
            }
        })
    }

    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide-content');
            showTabContent();
        })
    }

    function clickTabContent() {
        tabheaderParent.addEventListener('click', (event) => {
            const target = event.target;
            if (target && target.classList.contains('tabheader__item')) {
                tabheaderItem.forEach((item, index) => {
                    if (item === target) {
                        item.classList.add('tabheader__item_active');
                        showTabContent(index)
                    } else {
                        item.classList.remove('tabheader__item_active');
                    }
                })
            }
        })
    }

    hideTabContent()
    clickTabContent()

})