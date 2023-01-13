'use strict'

import {body, btnsPreview, btnClosePreview, btnsHeart, bestsellersList, previewPlace} from './elements_in_DOM';
import {openPopUp, closePopUpUsingBtn, changeState, changeHeartStyle} from './buttons';
import {renderList} from './render';

// changeState(Array.from(btnsHeart));
// changeHeartStyle(Array.from(btnsHeart));

async function getItems() {
	let content = await fetch('https://63a861d5f4962215b580f1f2.mockapi.io/api/goods')
	.then(response => response.json());

	renderList(content, bestsellersList);
};

//отображение хитов продаж
getItems();


