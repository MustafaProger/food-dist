// Урок 78. Используем классы в реальной работе
// Урок 79. Rest оператор и параметры по умолчанию (ES6)


window.addEventListener('DOMContentLoaded', function() {
    const menuField = document.querySelector('.menu__field .container');

    class PriceCard {
        constructor(img, altForImg, title, description, price, parentSelector, ...classes) {
            this.img = img;
            this.altForImg = altForImg;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes.length ? classes : ['menu__item'];
            this.transwer = 95;
            this.parent = document.querySelector(parentSelector);
            this.changeToRUB();
            this.render();
        }

        changeToRUB() {
            return this.price = this.price * this.transwer
        }

        render() {
            const div = document.createElement('div');
            this.classes.forEach(className => div.classList.add(className));
            
            div.innerHTML = `                
                <img src="${this.img}" alt="${this.altForImg}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>`;
            this.parent.append(div);
        }
    }

    new PriceCard(
        "img/tabs/vegy.jpg", 
        "vegy", 
        'Меню "Фитнес"', 
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        8,
        '.menu__field .container',
    );

    new PriceCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        16,
        '.menu__field .container',
    );

    new PriceCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        13,
        '.menu__field .container',
    )
    
});