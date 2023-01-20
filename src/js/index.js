'use strict'

import { renderBasketList } from './basket';
import { basketList, basketCounterInHeader, favoritesCounterInHeader } from './elements_in_DOM';
import { renderListOfBestsellers, getButtonsHeartInBestsellers, addToBasket, 
	getQuantityOfGoods } from './bestsellers';
import { IN_BASKET_KEY, IS_LIKED_KEY } from './constants';

//работа с сервером (mockapi)
export async function fetchItemsInBestsellers() {
	let content = await fetch('https://63a861d5f4962215b580f1f2.mockapi.io/api/goods/')
		.then(response => response.json());

	const renderProducts = new Promise((res, rej) => {
		res(renderListOfBestsellers(content))
	});
	renderProducts
		.then(getButtonsHeartInBestsellers())
		.then(addToBasket());
};

//получение данных из LocalStorage
function getDataFromLocalStorage (key) {
	if (!itemsInBasket.length && localStorage.getItem(key)) {
		JSON.parse(localStorage.getItem(key));
	};
};

// вызывается, чтоб информация отобразилась на странице
fetchItemsInBestsellers();

//получение данных из LocalStorage
getDataFromLocalStorage(IN_BASKET_KEY);
getDataFromLocalStorage(IS_LIKED_KEY);

//выведение общего кол-ва товаров в хедер (в значок)
getQuantityOfGoods(IN_BASKET_KEY, basketCounterInHeader);
getQuantityOfGoods(IS_LIKED_KEY, favoritesCounterInHeader);

//работа с сервером (basket)
export async function fetchBasket() {
	let content = await fetch('https://63a861d5f4962215b580f1f2.mockapi.io/api/goods?inBasket=true')
		.then(response => response.json());

	renderBasketList(content, basketList);
};

fetchBasket();