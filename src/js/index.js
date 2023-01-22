'use strict'

import { renderBasketList } from './basket';
import { basketList, basketCounterInHeader, favoritesCounterInHeader } from './elements_in_DOM';
import { fetchItemsInBestsellers } from './bestsellers&preview';
import { IN_BASKET_KEY, IS_LIKED_KEY, MOCKAPI_URL } from './constants';
import { getQuantityOfGoods } from './LocalStorage';

<<<<<<< HEAD
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
=======
//сюда из LocalStorage приходят id и кол-во элементов, которые были добавлены в корзину
let itemsInBasket = {};
>>>>>>> bbbc14e96a97976f278db3c39c4302bee1a876ce

//получение данных из LocalStorage
export function getDataFromLocalStorage (key) {
	if (localStorage.getItem(key)) {
		return JSON.parse(localStorage.getItem(key));
	};
};

<<<<<<< HEAD
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
=======
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
>>>>>>> bbbc14e96a97976f278db3c39c4302bee1a876ce
