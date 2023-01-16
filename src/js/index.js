'use strict'

import {body, btnsPreview, btnClosePreview, btnsHeart} from './elements_in_DOM';
import {openPopUp, closePopUpUsingBtn, changeState, changeHeartStyle} from './buttons';
import {getItems} from './network_requests';

//отображение хитов продаж
getItems();

//открытие быстрого просмотра
openPopUp(btnsPreview, body);

//закрытие быстрого просмотра
closePopUpUsingBtn(btnClosePreview, body);

// changeState(btnsHeart);
// changeHeartStyle(btnsHeart);

