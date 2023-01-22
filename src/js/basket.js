import {basket,btnCloseBasket,btnOpenBasket,body,btnDelete, basketList, itemInBasket, btnDeleteItem} from './elements_in_DOM';
import { IN_BASKET_KEY } from './constants';
import { getDataFromLocalStorage, saveDataToLocalStorage } from './index';
import { getQuantityOfGoods } from './bestsellers';

//откр и закр корзину

btnOpenBasket.addEventListener('click', showBasket)
btnCloseBasket.addEventListener('click', closeBasket)

const allPrice = document.querySelector(".basket__order-allPrice");

//открытие корзины через хэдер
function showBasket (){
  basket.classList.remove('none');
  body.style.overflow = 'hidden';
  let itemInBasket = getDataFromLocalStorage(IN_BASKET_KEY);
  fetchBasket(itemInBasket);
}

//закрытие корзины 
function closeBasket (){
  basket.classList.add('none');
  body.style.overflow = 'auto';
}

function clearBasketItem() {
  console.log(localStorage);
  // localStorage.removeItem('cartItems');
  countCartId = {};
  goodsCounter.innerText = '0';
  emptyCart();
}

function emptyCart () {
  basket.innerHTML = emptyItem;
  allPrice.innerText = `0 р.`;
}

//работа с сервером (basket)
export async function fetchBasket(itemsInBasket) {

	if (itemsInBasket === undefined) {
		return;
	}

	let content = await fetch('https://63a861d5f4962215b580f1f2.mockapi.io/api/goods?inBasket=true')
		.then(response => response.json());

	//func to filter response with ids in itemsInBasket

	let itemsInBasketIds = Object.keys(itemsInBasket);

	let basketArr = content.filter((item) => {
		return itemsInBasketIds.indexOf(item.id) !== -1; 
	})

	for (id in itemsInBasket) {
		basketArr.forEach(elem => {
			if (elem.id === id) {
				elem.quantity = itemsInBasket[id]
			}
		})
	}

	renderBasketList(basketArr, basketList);

};

export const createItemInBasket = ({ name, price, id, brand, itemPhoto, quantity}, finallyPrice) => {
  return `<li class="basket__item" id="item-${id}">
  <div class="basket__item-img-name">
    <img class="basket__item-img" src="${itemPhoto}" alt="product">
    
    <div class="basket__item-name-quantity">
      <h3 class="basket__brand">${brand}</h3>
      <h3 class="basket__name">${name}</h3>
      <div class="basket__quantity">
          <button class="basket__quantityMinus">-</button>
          <input type="number" class="basket__quantityNumber" value="${quantity}" min="1" placeholder = "1">
          <button class="basket__quantityPlus">+</button>
      </div>
    </div> 
  </div> 
  <div class="basket__item-price-btnDelete">
    <div class="basket__with-discount">${finallyPrice.toFixed(2)} р</div>
    <div class="basket__without-discount">${parseFloat(price) * quantity} р</div>
    <button class="basket__btn-deleteItem" id="btnDeleteItem">Удалить</button>
  </div>
  </li>`
 }

//добавляем товары в корзину, у которых inBasket - true

export let renderBasketList = (list, place) => {
  place.innerHTML = '';
  let totalPrice = 0;
  for (let elem in list) {
    let item = list[elem];
    let finallyPrice = (parseFloat(item.price) * (100 - item.discount) / 100 * item.quantity);
    totalPrice += (Math.round(finallyPrice * 100) / 100);
    let basketItemTemplate = createItemInBasket(list[elem], finallyPrice);
    place.insertAdjacentHTML('beforeend', basketItemTemplate);

    const deleteBtn = document.querySelector('#item-' + item.id + ' #btnDeleteItem');
    const minusBtn = document.querySelector('#item-' + item.id + ' .basket__quantityMinus');
    const plusBtn = document.querySelector('#item-' + item.id + ' .basket__quantityPlus');
    const quantityNumber = document.querySelector('#item-' + item.id + ' .basket__quantityNumber');

    deleteBtn.addEventListener('click', () => {removeItem(item)});
    minusBtn.addEventListener('click', () => {changeQuantity(item, '-')});
    plusBtn.addEventListener('click', () => {changeQuantity(item, '+')});
    quantityNumber.addEventListener('input', () => {updateQuantity(item)});

  }

  allPrice.innerHTML = totalPrice.toFixed(2) + ' р';
  
}

function removeItem (item) {
  
  let itemInBasket = getDataFromLocalStorage(IN_BASKET_KEY);

  delete itemInBasket[item.id];

  saveDataToLocalStorage(IN_BASKET_KEY, itemInBasket);

  getQuantityOfGoods(IN_BASKET_KEY);

  fetchBasket(itemInBasket);
	
}

function changeQuantity (item, param) {

  const quantityNumber = document.querySelector('#item-' + item.id + ' .basket__quantityNumber');
  
  item.quantity = param === "-" ? item.quantity - 1 : param === "+" ? item.quantity + 1 : 0;

  quantityNumber.value = item.quantity;

  updateQuantity(item);

}

function updateQuantity (item) {

  const quantityNumber = document.querySelector('#item-' + item.id + ' .basket__quantityNumber');

  if (quantityNumber.value == 0) {
    return removeItem(item);
  }

  let itemInBasket = getDataFromLocalStorage(IN_BASKET_KEY);

  for (id in itemInBasket) {
    if (id === item.id) {
      itemInBasket[id] = +quantityNumber.value
    }
  }

  saveDataToLocalStorage(IN_BASKET_KEY, itemInBasket);

  getQuantityOfGoods(IN_BASKET_KEY);

  fetchBasket(itemInBasket);

}
