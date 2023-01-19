const cards = document.getElementById("bestsellers__list"); // карточки с товарами
const btnBasket = document.getElementById("basket-title"); // слово "корзина"
const basketModal = document.getElementById("basket-modal"); // модалка (корзина)
const basket = document.querySelector(".basket");
const basketImg = document.getElementById("basket-img"); // картинка корзины
const basketDelete = document.getElementById("basket-delete"); // кнопка "очистить корзину"
const basketItem = document.getElementById("basket-item") // карточка товара
const btnDelete = document.getElementById("btn-delete");  // кнопка "удалить"
let goodsCounter = document.getElementById("goods-counter"); // счётчик товаров
const basketList = document.getElementById('basket-list'); // список товаров в модалке
const inputEnter = document.getElementById("header__search-input"); // input
let newPrice = document.getElementById("price-with-discount"); // цена со скидкой
let oldPrice = document.getElementById("price-without-discount"); // цена без скидки
let allPrice = document.getElementById( "all-price"); // итоговая цена

// let goodsList = []; // 
let finalPrice = 0; // первоначальная цена (будет меняться при добавлении товаров в корзину)
let goodsCount = {}; // кол-во товаров
let filterArray = []; 

async function filterGoods() { // поиск товаров через input
    let responce = await fetch('https://63a861d5f4962215b580f1f2.mockapi.io/api/goods/') 
    return  await responce.json() 
    .then((el) => {
        inputEnter.addEventListener('input', (e) => {
            cards.innerHTML=''; 
            filterArray = el.filter((item) => { // фильтрует товары
                return item.title.toLowerCase().includes(e.target.value.toLowerCase()) // ищет названия карточек в нижнем регистре
            })  
            if(inputEnter.value === '') {
                // должна быть ссылка на рендер карточек
                'https://63a861d5f4962215b580f1f2.mockapi.io/api/goods/'
            }          
        })
    })
}
filterGoods()


btnBasket.addEventListener('click', function(e) { 
    e.preventDefault(); // дефолтное действие отменяется
    basketModal.classList.add('click-basket'); // добавляет модалке class 'click-basket'
    renderBasket(); // рендер корзины
})

basketImg.addEventListener('click', function(e)  { // при клике на картинку корзины - рендер корзины
    e.preventDefault();
    basketModal.classList.add('click-basket');
    renderBasket();
})

basketDelete.addEventListener('click', () => { // очистка корзины
    localStorage.removeItem('basketElements');
    goodsCount = {};
    goodsCounter.innerText = '0'; // показывает 0 товаров в корзине
    renderBasket(); 
})

btnDelete.addEventListener('click', () => { // удалить товар
    // localStorage.removeItem('basketItem');
    basketItem.remove();   // * сделать для 3 карточек 3 уникальных id
})

function addToBasket(element) { // добавить товар в корзину

    if (localStorage.getItem('basketElements')) {
    goodsCount = JSON.parse(localStorage.getItem('basketElements')); // строка преобразуется в объект, в localStorage вернется ключ basketElements
    } else {
        goodsCount = {};
    }
        if (goodsCount[element.id])
            goodsCount[element.id] += 1; // добавляется 1 товар
        else {
            goodsCount[element.id] = 1; 
        }
    localStorage.setItem('basketElements', JSON.stringify(goodsCount)); // в localStorage добавляется кол-во товаров
    console.log(goodsCount);
    goodsCounter.innerText = Object.values(JSON.parse(localStorage.getItem('basketElements'))).reduce((acc, cur) => acc + cur); // получаем результирующее значение от суммы тоаров
}
if (localStorage.getItem('basketElements')) {
    goodsCounter.innerText = Object.values(JSON.parse(localStorage.getItem('basketElements'))).reduce((acc, cur) => acc + cur);
}

btnBasket.addEventListener('click', function(e) { 
    // e.preventDefault(); 
    basketModal.show();
    // renderBasket(); // рендер корзины
});

// откр и закр корзину

// btnBasket.addEventListener('click', showBasket) 
// // btnCloseBasket.addEventListener('click', closeBasket)

// //открытие корзины через хэдер
// function showBasket (){
//     basket.classList.remove('none')
//     body.style.overflow = 'hidden';
// }

// //закрытие корзины 
// function closeBasket (){
//     basket.classList.add('none')
//     body.style.overflow = 'auto';
// }

async function renderBasket() { 
    let responce = await fetch('https://63a861d5f4962215b580f1f2.mockapi.io/api/goods/') // адрес для отправки запроса
    return  await responce.json() // возвращает данные в формате json
    .then((el) => {
    basketList.innerHTML = ''; // делает содержимое пустой строкой
    goodsCount = JSON.parse(localStorage.getItem('basketElements')); // преобразует строку json в объект, получает элеиенты корзины в localStorage
    let basketItem = ''; // товар
    if (goodsCount) {
        el.forEach((item) => {
            if (goodsCount.hasOwnProperty(item.id)) {
                basketItem = `<li class="basket__item-img-name" id="card-${item.id}">
                <img class = "basket__item-img" src="${item.url}" alt="product">
                <h3 class="basket__item-name">${item.name}</h3>
            <div class="basket__item-price-btnDelete">
                <div class="basket__with-discount">${newPrice[item.id]} руб></div>
                <div class="basket__without-discount">${oldPrice[item.id]} руб</div>   
                <button id="btn-delete" class="basket__btn-deleteItem">${item.delete}</button>
            </div>
            </li>`;
            basketList.insertAdjacentHTML("afterbegin", basketItem); // список товаров вставляется в DOM дерево
            finalPrice += (`newPrice[item.id]` * goodsCount[item.id]); // цена со скидкой умножается на кол-во товаров
            }
        })
        allPrice.innerText = `Итого: ${finalPrice} руб`; // итоговая цена 
    } 
    })
}
