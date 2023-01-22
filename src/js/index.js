'use strict'

import { renderBasketList } from './basket';
import { basketList, bestsellersList } from './elements_in_DOM';
import { renderListOfBestsellers, getButtonsHeartInBestsellers, addToBasket, getQuantityOfGoods, addParamsForPreview } from './bestsellers';
import { IN_BASKET_KEY, IS_LIKED_KEY } from './constants';

//работа с сервером (mockapi)
export async function fetchItemsInBestsellers() {
	let content = await fetch('https://63a861d5f4962215b580f1f2.mockapi.io/api/goods/')
		.then(response => response.json());

	renderItemsInBestsellers(content);
};

export async function renderItemsInBestsellers(content) {

	const renderProducts = new Promise((res, rej) => {
		res(renderListOfBestsellers(content))
	});
	
	renderProducts
		.then(getButtonsHeartInBestsellers())
		.then(addToBasket());
};

//получение данных из LocalStorage
export function getDataFromLocalStorage (key) {
	if (localStorage.getItem(key)) {
		return JSON.parse(localStorage.getItem(key));
	};
};

//save данных из LocalStorage
export function saveDataToLocalStorage (key, object) {
	localStorage.setItem(key, JSON.stringify(object));
};

//сюда из LocalStorage приходят id и кол-во элементов, которые были добавлены в корзину

export let itemsInBasket = getDataFromLocalStorage(IN_BASKET_KEY);
export let itemsLiked = getDataFromLocalStorage(IS_LIKED_KEY);

//выведение общего кол-ва товаров в хедер (в значок)
getQuantityOfGoods(IN_BASKET_KEY);

// вызывается, чтоб информация отобразилась на странице
fetchItemsInBestsellers();

bestsellersList.addEventListener('click', () => {
	addParamsForPreview();
});
