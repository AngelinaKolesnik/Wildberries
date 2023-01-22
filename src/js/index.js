'use strict'

import { renderBasketList } from './basket';
import { basketList, basketCounterInHeader, favoritesCounterInHeader } from './elements_in_DOM';
import { fetchItemsInBestsellers } from './bestsellers&preview';
import { IN_BASKET_KEY, IS_LIKED_KEY, MOCKAPI_URL } from './constants';
import { getQuantityOfGoods } from './LocalStorage';

//сюда из LocalStorage приходят id и кол-во элементов, которые были добавлены в корзину
let itemsInBasket = {};

//получение данных из LocalStorage
function getDataFromLocalStorage (key) {
	if (!itemsInBasket.length && localStorage.getItem(key)) {
		itemsInBasket = JSON.parse(localStorage.getItem(key));
	};
};

// вызывается, чтоб информация отобразилась на странице
fetchItemsInBestsellers();

//получение данных из LocalStorage
getDataFromLocalStorage(IN_BASKET_KEY);
getDataFromLocalStorage(IS_LIKED_KEY);

//выведение общего кол-ва товаров в хедер (в значки)
getQuantityOfGoods(IN_BASKET_KEY, basketCounterInHeader);
getQuantityOfGoods(IS_LIKED_KEY, favoritesCounterInHeader);

//работа с сервером (basket)
export async function fetchBasket() {
	let content = await fetch(`${MOCKAPI_URL}?inBasket=true`)
		.then(response => response.json());

	renderBasketList(content, basketList);
};

fetchBasket();