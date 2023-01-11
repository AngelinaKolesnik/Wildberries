'use strict'

import {openPopUp, closePopUpUsingBtn} from './buttons';
import {body, btnsPreview, popUpPreview, btnClosePreview} from './elements_in_DOM';

//открытие быстрого просмотра
openPopUp(btnsPreview, body);

//закрытие быстрого просмотра
closePopUpUsingBtn(btnClosePreview, body);