import {bestsellersList} from './elements_in_DOM'; 
import {renderItemsInBestsellers} from './index';

const cards = document.getElementById("bestsellers__list"); // карточки с товарами
const btnOpenBasket = document.querySelector('#btnToBasket');
const btnCloseBasket = document.querySelector('.btn-close-basket');
const btnBasket = document.getElementById("basket-title"); // слово "корзина"
const basketModal = document.getElementById("basket-modal"); // модалка (корзина)
const basket = document.querySelector(".btnBasket");
const basketImg = document.getElementById("basket-img"); // картинка корзины
// const basketDelete = document.getElementById("basket-delete"); // кнопка "очистить корзину"
const basketItem = document.getElementById("basket__item"); // карточка товара
const btnDelete = document.getElementById("btnDeleteItem");  // кнопка "удалить"
const goodsCounter = document.getElementById("goods-count"); // счётчик товаров
// const goodsCounterInHeader = document.querySelector('.goods-count');
// const basketList = document.getElementById('basket-list'); // список товаров в модалке
const basketList = document.querySelector('.basket__list');
const inputEnter = document.getElementById("input-enter"); // input
let newPrice = document.querySelector(".price__with-discount"); // цена со скидкой
let oldPrice = document.querySelector(".price__without-discount"); // цена без скидки
let allPrice = document.querySelector(".basket__order-allPrice"); // итоговая цена

const emptyItem = `<li class="basket__item">Корзина пуста...</li>`;


let countCartId = {};
let goods = [];
const getCartItems = () => JSON.parse(localStorage.getItem('cartItems'));


// let goodsList = []; // 
let finalPrice = 0; // первоначальная цена (будет меняться при добавлении товаров в корзину)
let goodsCount = {}; // кол-во товаров
let filterArray = []; 

async function fetchGoods(filter) { // поиск товаров через input
    let responce = await fetch('https://63a861d5f4962215b580f1f2.mockapi.io/api/goods/');
    let result = await responce.json();
    if (filter) {
        console.log(result);
        return result.filter((item)=>{
            return item.name.toLowerCase().includes(filter.toLowerCase()) || item.brand.toLowerCase().includes(filter.toLowerCase())
        });
    }
    return result;
    // .then((el) => {
    //     console.log(el);
    //     inputEnter.addEventListener('input', (e) => {
    //         cards.innerHTML = ''; 
    //         filterArray = el.filter((item) => { // фильтрует товары
    //             return item.title.toLowerCase().includes(e.target.value.toLowerCase()) // ищет названия карточек в нижнем регистре
    //         })  
    //         if(inputEnter.value === '') {
    //             // должна быть ссылка на рендер карточек
    //             'https://63a861d5f4962215b580f1f2.mockapi.io/api/goods/'
    //         }          
    //     })
    // })
}

// btnBasket.addEventListener('click', function(e) { 
//     e.preventDefault(); // дефолтное действие отменяется
//     basketModal.classList.add('click-basket'); // добавляет модалке class 'click-basket'
//     renderBasket(); // рендер корзины
// })


// basketDelete.addEventListener('click', () => { // очистка корзины
//     localStorage.removeItem('basketElements');
//     goodsCount = {};
//     goodsCounter.innerText = '0'; // показывает 0 товаров в корзине
//     renderBasket(); 
// })

// btnDelete.addEventListener('click', () => { // удалить товар
//     // localStorage.removeItem('basketItem');
//     basketItem.remove();   // * сделать для 3 карточек 3 уникальных id
// })

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
    // goodsCounter.innerText = Object.values(JSON.parse(localStorage.getItem('basketElements'))).reduce((acc, cur) => acc + cur);
}

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


// ПОИСК ЭЛЕМЕНТОВ ЧЕРЕЗ INPUT
inputEnter.addEventListener("input", async (e) => {
    let goods = await fetchGoods(e.target.value);
    renderItemsInBestsellers(goods);   
})

//РЕНДЕРИНГ КАРТОЧЕК
function renderCards(data){
    data.forEach(function (item){
    bestsellersList.insertAdjacentHTML("afterbegin", createItemInBasket(item));

    // const enlargePic = document.getElementById("enlarge-img");
    // enlargePic.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     modalPic.classList.add('open-pic');
    //     modalPicWrapper.innerHTML=`
    //     <img src="${item.url}" alt="" class="modal-pic__img">
    //     `
    // })
    const moveToCartBtn = document.getElementById(`btn-${item.id}`);
    moveToCartBtn.addEventListener('click', () => moveToCart(item))
})
}

document.addEventListener('scroll', function() {
    document.querySelector('.header').classList.add('fixed');
    document.body.style.paddingTop = '94px';
})

// const displayCard = ({ id, url, title, truePrice, falsePrice }) => (`
//     <div class="popular__card" id="${id}">
//     <div class="popular__img">
//         <img class="popular__image" src="${url}" alt="image">
//         <div class="popular__enlarge-img" id="enlarge-img">
//         </div>
//     </div>
//     <div class="popular__top">
//         <div class="popular_wrap">
//             <h2 class="popular__card-title">${title}</h2>
//             <p class="popular__price">${truePrice} руб.</p>
//         </div>
//         <div class="popular__perc-discount">-10%</div>
//     </div>
//     <div class="popular__bottom">
//         <p class="popular__old-price">${falsePrice} руб.</p>
//         <button class="popular__card-btn btn" id="btn-${id}">В корзину</button>
//     </div>
//     </div>`);