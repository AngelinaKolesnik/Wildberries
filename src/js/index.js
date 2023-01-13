'use strict'

import {bestsellersList} from './elements_in_DOM';
import {renderList} from './render';

//отображение хитов продаж
async function getItems() {
	let content = await fetch('https://63a861d5f4962215b580f1f2.mockapi.io/api/goods')
	.then(response => response.json());

	renderList(content, bestsellersList);
};

getItems();