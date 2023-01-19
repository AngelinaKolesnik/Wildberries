'use strict'

import { renderBasketList } from './basket';
import { basketList, bestsellersList } from './elements_in_DOM';
import { renderListOfBestsellers, getButtonsHeartInBestsellers, addToBasket, getQuantityOfGoods, addParamsForPreview } from './bestsellers';
import { IN_BASKET_KEY, IS_LIKED_KEY } from './constants';

//сюда из LocalStorage приходят id и кол-во элементов, которые были добавлены в корзину
let itemsInBasket = {};

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
		itemsInBasket = JSON.parse(localStorage.getItem(key));
	};
};

getDataFromLocalStorage(IN_BASKET_KEY);
getDataFromLocalStorage(IS_LIKED_KEY);

//выведение общего кол-ва товаров в хедер (в значок)
getQuantityOfGoods(IN_BASKET_KEY);

// вызывается, чтоб информация отобразилась на странице
fetchItemsInBestsellers();

bestsellersList.addEventListener('click', () => {
	addParamsForPreview();
});

//работа с сервером (basket)
export async function fetchBasket() {
	let content = await fetch('https://63a861d5f4962215b580f1f2.mockapi.io/api/goods?inBasket=true')
		.then(response => response.json());

	renderBasketList(content, basketList);
};

fetchBasket();