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

    const getResource = async (url, data) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`)
        }

        return await result.json()
    }

    getResource("http://localhost:3000/menu")
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new PriceCard(img, altimg, title, descr, price, '.menu__field .container')
            });
        })
});