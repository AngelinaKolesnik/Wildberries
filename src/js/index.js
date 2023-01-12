'use strict'

import {body, btnsPreview, btnClosePreview, btnsHeart, bestsellersList} from './elements_in_DOM';
import {openPopUp, closePopUpUsingBtn, changeState, changeHeartStyle} from './buttons';
// import {getItems} from './network_requests';
import {renderList} from './render';

let bestsellers = [];

//открытие быстрого просмотра
openPopUp(btnsPreview, body);

//закрытие быстрого просмотра
closePopUpUsingBtn(btnClosePreview, body);

// changeState(btnsHeart);
// changeHeartStyle(btnsHeart);

async function getItems() {
	let content = await fetch('https://63a861d5f4962215b580f1f2.mockapi.io/api/goods')
	.then(response => response.json());

	bestsellers = content;

	renderList(bestsellers, bestsellersList);
};

//отображение хитов продаж
getItems();


