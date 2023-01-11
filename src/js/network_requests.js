import {bestsellersList} from './elements_in_DOM';
import {createItem} from './ui';

export async function getItems() {
	let response = await fetch('https://63a861d5f4962215b580f1f2.mockapi.io/api/goods');
	let content = await response.json();

	for (let item in content) {
		bestsellersList.insertAdjacentHTML('beforeend', createItem(content[item]));
	};
};