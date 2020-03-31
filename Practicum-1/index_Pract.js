let pizzas = [{
    image: 'https://www.maggi.ru/data/images/recept/img640x500/recept_3307_tpnj.jpg',
    name: 'Маргарита',
    composition: 'Соус, сыр моцарелла, помидоры',
    price: 15
}, {
    image: 'https://i.pinimg.com/originals/2d/04/fa/2d04fa4c58ad59b7597df9a12e3fb730.jpg',
    name: 'Овощная',
    composition: 'Соус, сыр, помидоры, перец, лук, оливки',
    price: 10
}, {
    image: 'https://images.aif.ru/013/145/9c362df81ff1f156877062fd781c6ef6.jpg',
    name: 'Неополитанская',
    composition: 'Соус, сыр, салями, грибы, оливки',
    price: 20
}, {
    image: 'https://img05.rl0.ru/eda/c620x415i/s2.eda.ru/StaticContent/Photos/120131085053/171027192707/p_O.jpg',
    name: 'Гавайская',
    composition: 'Соус, сыр, куриное филе, ананас',
    price: 17
}, {
    image: 'https://st.frendi.ru/cfs15/deal_offer/3d/06/3d06aff71df863d920772b5c86377919.jpg',
    name: 'Баварская',
    composition: 'Соус, сыр, колбаски, ветчина, помидоры',
    price: 16
}, {
    image: 'https://takiepirogi.by/assets/images/products/52/chetyiresezona3.rvu52.jpg',
    name: 'Четыре сезона',
    composition: 'Соус, сыр, мясо, салями, помидоры, перец',
    price: 18
}];

const pizzasInBasket = [];
let allAmountInBasket = 0;
let totalСost = 0;
const mainPromoCod = 'za';

function getPizzaList(pizzasArr) {
    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = "";

    mainContainer.insertAdjacentHTML('beforeend', `<form class="main-basket">
    <input id="basket" type="button" value="0">
    </form><div id="prodacts"></div>`);

    const prodacts = document.getElementById('prodacts');
    for (let i = 0; i < pizzasArr.length; i++) {
        prodacts.insertAdjacentHTML('beforeend', `<div class="prodacts-cards">
        <div><img src="${pizzasArr[i].image}"></div>
        <div class="name">${pizzasArr[i].name}</div>
        <div class="composition">${pizzasArr[i].composition}</div>
        <div class="price">${pizzasArr[i].price} руб.</div>
        
        <div class="basket-form"><form>
        <input type="number" class="amount-prodact-basket" value="1">
        <button type="button" class="prodact-basket">Добавить в корзину</button>
        </form></div></div>`);
    }
}

getPizzaList(pizzas);

const prodactBasket = document.getElementsByClassName('prodact-basket');
const amountProdactBasket = document.getElementsByClassName('amount-prodact-basket');
const basket = document.getElementById('basket');

for (let i = 0; i < prodactBasket.length; i++) {
    let numberOfTimes = -1;
    prodactBasket[i].addEventListener('click', function(event) {
        if (event.target) {
            const amountInBasket = Number(amountProdactBasket[i].value);
            for (let j = 0; j < pizzasInBasket.length; j++) {
                if (pizzas[i].name === pizzasInBasket[j].items.name) {
                    numberOfTimes = j;
                }
            }
            if (numberOfTimes === -1) {
                pizzasInBasket.push({
                    items: pizzas[i],
                    num: amountInBasket
                });
            } else {
                pizzasInBasket[numberOfTimes].num = pizzasInBasket[numberOfTimes].num + amountInBasket;
            }
            allAmountInBasket += amountInBasket;
            basket.value = allAmountInBasket;
            amountProdactBasket[i].value = 1;
        }
    });
}

basket.addEventListener('click', function() {

    const mainContainer = document.getElementById('main-container');
    mainContainer.innerHTML = "";

    mainContainer.insertAdjacentHTML('beforeend', `<input id="return-to-prodacts" type="button" value="Вернуться к списку товаров">
    <p class="basket-name">Корзина</p>
    <table id="basket-list-table"></table>`);
    const basketListTable = document.getElementById('basket-list-table');

    let totalPizzaCost = 0;

    for (let i = 0; i < pizzasInBasket.length; i++) {
        basketListTable.insertAdjacentHTML('beforeend', `<tr class="line">
        <td><img src="${pizzasInBasket[i].items.image}"></td>
        <td class="pizzas-basket-name">${pizzasInBasket[i].items.name}</td>
        <td class="pizzas-basket-num">${pizzasInBasket[i].num}</td>
        <td class="pizzas-basket-price">${pizzasInBasket[i].num * pizzasInBasket[i].items.price} руб.</td>
        </tr>`);
        totalPizzaCost = pizzasInBasket[i].num * pizzasInBasket[i].items.price;
        totalСost = totalСost + totalPizzaCost;
    }
    mainContainer.insertAdjacentHTML('beforeend', `<div class="order-field"><div id="total-cost-place">Стоимость заказа: ${totalСost} руб.</div>
    <div class="promo"><p>Введите промокод</p>
    <input id="promo-cod" type="text" value="">
    <button id="button-promo-code">Применить промокод</button>
    </div>
    <div class="checkout-field">
    <p class="checkout">Оформление заказа:</p>
    <table>
    <tr><td>Адрес доставки:</td><td><input type="text"></td></tr>
    <tr><td>Имя:</td><td><input type="text"></td></tr>
    <tr><td>e-mail:</td><td><input type="text"></td></tr>
    <tr><td>Телефон:</td><td><input type="number"></td></tr>
    </table>
    <input id="make-order" type="button" value="Заказать">
    </div></div>`);

    const buttonPromoCode = document.getElementById('button-promo-code');

    const getPromoCode = function() {
        const promoCod = document.getElementById('promo-cod').value;
        const totalCostPlace = document.getElementById('total-cost-place');

        if (promoCod == mainPromoCod) {
            totalСost = (totalСost * 0.8).toFixed(2);
            totalCostPlace.innerText = `Стоимость заказа с учетом скидки: ${totalСost} руб.`;
            buttonPromoCode.removeEventListener('click', getPromoCode);
        } else {
            alert(`Промокод введен не верно!`);
        }
    }
    buttonPromoCode.addEventListener('click', getPromoCode);

    const makeOrder = document.getElementById('make-order');
    makeOrder.addEventListener('click', function() {
        mainContainer.innerHTML = "";
        mainContainer.insertAdjacentHTML('beforeend', `<div class="sent-order">Ваш заказ отправлен!</div`);
    })

    const returnToProdacts = document.getElementById('return-to-prodacts');
    returnToProdacts.addEventListener('click', function() {
        getPizzaList(pizzas);
    });
});