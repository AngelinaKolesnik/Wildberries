import { createItem } from './ui';
import { closePopUp, openPopUp, changeBtn } from './buttons';
import { basket, popUpPreview, bestsellersList, previewImgFirst, previewImgSecond, previewBrand, previewName, previewArticle, previewInitialPrice, previewFinallyPrice, btnHeartInPreview, btnOrderInPreview, goodsCounterInHeader, btnOpenBasketInPreview } from './elements_in_DOM';
import { IN_BASKET_KEY, IS_LIKED_KEY } from './constants';

//отображение на экране
export function renderListOfBestsellers(list) {
	bestsellersList.innerHTML = '';

	if (list.length === 0) {
		bestsellersList.innerHTML = 'Not found';
	}

	for (let item in list) {
		//итоговая цена
		let finallyPrice = (list[item].price * (100 - list[item].discount) / 100).toFixed(2);

		//вставка элемента
		bestsellersList.insertAdjacentHTML('beforeend', createItem(list[item], finallyPrice));

		//открытие попапа
		bestsellersList
			.querySelector(`button[data-idPreview='${list[item].id}']`)
			.addEventListener('click', () => {
				openPopUp(popUpPreview);

				//установка параметров попапа
				previewImgFirst.src = list[item].itemPhoto;
				previewImgSecond.src = list[item].itemPhoto_2;
				previewBrand.innerHTML = `${list[item].brand} /`;
				previewName.innerHTML = list[item].name;
				previewArticle.innerHTML = list[item].id;
				previewInitialPrice.innerHTML = `${list[item].price} $`;
				previewFinallyPrice.innerHTML = `${finallyPrice} $`;
				popUpPreview.setAttribute('id', `${list[item].id}-Preview`);
			
				//открытие корзины при нажатии накнопку "перейти в корзину"
				btnOpenBasketInPreview.addEventListener('click', () => {
					closePopUp(popUpPreview);
					changeBtn(btnOpenBasketInPreview, btnOrderInPreview);
					clearParams(list[item].id);
					openPopUp(basket);
				});
			});

		//закрытие попапа	
		popUpPreview
			.querySelector('.preview__btn-close')
			.addEventListener('click', () => {
				closePopUp(popUpPreview);
				changeBtn(btnOpenBasketInPreview, btnOrderInPreview);
				clearParams(list[item].id);
			});
	};
};

//попытка (бессмысленная) отделения от цикла, все равно вызывается функция renderListOfBestsellers
export function addParamsForPreview() {

	//подставление данных в preview
	if (popUpPreview.hasAttribute('id')) {
		//получение необходимого формата id 
		let id = parseInt(popUpPreview.getAttribute('id'));

		btnHeartInPreview.setAttribute('id', `${id}-btnHeartInBestsellers`);

		btnOrderInPreview.addEventListener('click', () => {
			changeBtn(btnOrderInPreview, btnOpenBasketInPreview);
			addToLocalStorageSeveral(id, IN_BASKET_KEY);
		});

		changeStyleBtnHeart(btnHeartInPreview);

		btnHeartInPreview.addEventListener('click', () => {			
			addToLocalStorageIsLiked(id, IS_LIKED_KEY);
			changeStyleBtnHeart(btnHeartInPreview);

			let btnsHeart = Array.from(bestsellersList.querySelectorAll('.btn-heart'));

			//изменение стилей аналогичной кнопки в bestsellers
			for (let btn in btnsHeart) {

				if (+btn + 1 == id) {
					changeStyleBtnHeart(btnsHeart[btn]);
				};
			};
		});
	};
};

//очистка preview
export function clearParams(id) {
	previewImgFirst.src = '';
	previewImgSecond.src = '';
	previewBrand.innerHTML = '';
	previewName.innerHTML = '';
	previewArticle.innerHTML = '';
	previewInitialPrice.innerHTML = '';
	previewFinallyPrice.innerHTML = '';
	btnHeartInPreview.classList.remove(`btn-heart--${id}`);
	btnHeartInPreview.removeAttribute('id');
	btnOrderInPreview.removeAttribute('id');
	popUpPreview.removeAttribute('id');
};

export function addToBasket() {
	//находим все кнопки "добавить в корзину" в бестселлерах
	const btnsOrderInBestsellers = Array.from(bestsellersList.querySelectorAll('.bestsellers__btn-order'));

	for (let btn in btnsOrderInBestsellers) {
		//ключ элемент в object, т.к. id начинаются с 1, а btn с 0
		let id = +btn + 1;

		btnsOrderInBestsellers[btn].addEventListener('click', () => addToLocalStorageSeveral(id, IN_BASKET_KEY));
	};
};

//сохранение в LocalStorage из секции bestsellers
export function addToLocalStorageSeveral(id, key) {
	let object;

	//проверка наличия в LocalStorage
	if (localStorage.getItem(key)) {
		object = JSON.parse(localStorage.getItem(key));
	} else {
		//без этого условия, если из LocalStorage ничего не приходит, первый элемент будет null
		object = {};
	};

	//значение ключа в object
	if (object[id]) {
		object[id] += 1;
	} else {
		object[id] = 1;
	};
	
	localStorage.setItem(key, JSON.stringify(object));

	getQuantityOfGoods(key);
};

//выведение общего кол-ва товаров в хедер (в значок)
export function getQuantityOfGoods(key) {
	let quantity;

	//получение общего кол-ва товаров 
	if (localStorage.getItem(key)) {
		goodsCounterInHeader.classList.remove('none');
		let values = Object.values(JSON.parse(localStorage.getItem(key)));
		quantity = values.length && values.reduce((acc, cur) => acc + cur);
	} else {
		goodsCounterInHeader.classList.add('none');
	};

	goodsCounterInHeader.innerText = quantity;
};

export function getButtonsHeartInBestsellers() {
	let btnsHeart = Array.from(bestsellersList.querySelectorAll('.btn-heart'));

	for (let btn in btnsHeart) {
		changeStyleBtnHeart(btnsHeart[btn]);

		btnsHeart[btn].addEventListener('click', () => {
			let id = +btn + 1;
			
			addToLocalStorageIsLiked(id, IS_LIKED_KEY);
			changeStyleBtnHeart(btnsHeart[btn]);
		});
	};
};

export function changeStyleBtnHeart (btn) {
	let object;
	let id = parseInt(btn.getAttribute('id'));

	if (localStorage.getItem(IS_LIKED_KEY)) {
		object = JSON.parse(localStorage.getItem(IS_LIKED_KEY));
	} else {
		//без этого условия, если из LocalStorage ничего не приходит, первый элемент будет null
		object = {};
	};

	if (!object[id] || (object[id] == 0)) {
		changeStyleRemove(btn)
	} else {
		changeStyleAdd(btn)
	};
};

export function changeStyleAdd(btn) {
	const btnHeartLeft = btn.querySelector('.btn-heart__left');
	const btnHeartRight = btn.querySelector('.btn-heart__right');

	btn.classList.add('btn-heart--success');
	btnHeartLeft.classList.add('btn-heart__left--success');
	btnHeartRight.classList.add('btn-heart__right--success');
};

export function changeStyleRemove(btn) {
	const btnHeartLeft = btn.querySelector('.btn-heart__left');
	const btnHeartRight = btn.querySelector('.btn-heart__right');

	btn.classList.remove('btn-heart--success');
	btnHeartLeft.classList.remove('btn-heart__left--success');
	btnHeartRight.classList.remove('btn-heart__right--success');
};

//сохранение в LocalStorage лайкнутых элементов
export function addToLocalStorageIsLiked(id, key) {
	let object;

	//проверка наличия в LocalStorage
	if (localStorage.getItem(key)) {
		object = JSON.parse(localStorage.getItem(key));
	} else {
		//без этого условия, если из LocalStorage ничего не приходит, первый элемент будет null
		object = {};
	};

	//значение ключа в object
	if (!object[id] || (object[id] == 0)) {
		object[id] = 1;
	} else {
		object[id] = 0;
	};
	
	localStorage.setItem(key, JSON.stringify(object));
};