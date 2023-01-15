'use strict'
import {renderBasketList} from './basket';
import {bestsellersList, previewPlace, basketList} from './elements_in_DOM';
import {renderListOfBestsellers, renderPreview, renderBasketList} from './render';

//работа с сервером (bestsellers & preview)
export async function fetchItems() {
	let content = await fetch('https://63a861d5f4962215b580f1f2.mockapi.io/api/goods/')
	.then(response => response.json());

	renderListOfBestsellers(content, bestsellersList);
};

fetchItems();

//работа с сервером (preview)
export async function fetchPreview(id) {
	let content = await fetch('https://63a861d5f4962215b580f1f2.mockapi.io/api/goods/')
	.then(response => response.json());

	renderPreview(content[id - 1], previewPlace);
};


//работа с сервером (basket)
export async function fetchBasket() {
  let content = await fetch('https://63a861d5f4962215b580f1f2.mockapi.io/api/goods?inBasket=true')
  .then(response => response.json());
 
  renderBasketList(content, basketList);
 };

 fetchBasket();