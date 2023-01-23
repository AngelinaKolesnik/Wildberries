import {bestsellersList} from './elements_in_DOM'; 
import {renderItemsInBestsellers} from './index';

const goodsCounter = document.getElementById("goods-count"); // счётчик товаров
const basketList = document.querySelector('.basket__list');
const inputEnter = document.getElementById("input-enter"); // input
let newPrice = document.querySelector(".price__with-discount"); // цена со скидкой
let oldPrice = document.querySelector(".price__without-discount"); // цена без скидки
let allPrice = document.querySelector(".basket__order-allPrice"); // итоговая цена

const emptyItem = `<li class="basket__item">Корзина пуста...</li>`;


let countCartId = {};
let goods = [];
const getCartItems = () => JSON.parse(localStorage.getItem('cartItems'));

let finalPrice = 0; // первоначальная цена (будет меняться при добавлении товаров в корзину)
let goodsCount = {}; // кол-во товаров

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
    
}
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
    const moveToCartBtn = document.getElementById(`btn-${item.id}`);
    moveToCartBtn.addEventListener('click', () => moveToCart(item))
})
}

document.addEventListener('scroll', function() {
    document.querySelector('.header').classList.add('fixed');
    document.body.style.paddingTop = '94px';
})