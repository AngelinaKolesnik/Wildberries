'use strict'

import { popUpPreview } from './elements_in_DOM';
import { renderListOfBestsellers, renderPreview, getButtonsWithoutInDOM } from './render';
import { closePopUp } from './buttons';

//работа с сервером (bestsellers & preview)
export async function fetchItemsInBestsellers() {
	let content = await fetch('https://63a861d5f4962215b580f1f2.mockapi.io/api/goods/')
		.then(response => response.json());

	const renderProducts = new Promise((resolve, reject) => {
		resolve(renderListOfBestsellers(content))
	});

	renderProducts
		.then(getButtonsWithoutInDOM());
};

//вызывается, чтоб на странице отобразилась информация
fetchItemsInBestsellers()

export async function updateItemInPreview(id) {
	let content = await fetch('https://63a861d5f4962215b580f1f2.mockapi.io/api/goods/')
		.then(response => response.json());

	const renderProducts = new Promise((resolve, reject) => {
		resolve(renderListOfBestsellers(content))
	});

	renderProducts
		.then(closePopUp(popUpPreview))
		.then(renderPreview(content[id - 1]))
		.then(getButtonsWithoutInDOM());
};