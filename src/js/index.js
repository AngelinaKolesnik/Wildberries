'use strict'

// import { renderBasketList } from './basket';
import { basketList, bestsellersList, basketCounterInHeader, favoritesCounterInHeader } from './elements_in_DOM';
import { fetchItemsInBestsellers, renderListOfBestsellers, getButtonsHeartInBestsellers, addToBasket, } from './bestsellers&preview';
import { IN_BASKET_KEY, IS_LIKED_KEY, MOCKAPI_URL } from './constants';
import { getQuantityOfGoods } from './LocalStorage';

//работа с сервером (mockapi)
export async function fetchItemsInBestsellers() {
	let content = await fetch('MOCKAPI_URL')
		.then(res => res.json());

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

//сохранение данных из LocalStorage
export function saveDataToLocalStorage (key, object) {
	localStorage.setItem(key, JSON.stringify(object));
};

export let itemsInBasket = getDataFromLocalStorage(IN_BASKET_KEY);
export let itemsLiked = getDataFromLocalStorage(IS_LIKED_KEY);

//выведение общего кол-ва товаров в хедер (в значок)
getQuantityOfGoods(IN_BASKET_KEY);

// вызывается, чтоб информация отобразилась на странице
fetchItemsInBestsellers();

// bestsellersList.addEventListener('click', () => {
// 	addParamsForPreview();
// });