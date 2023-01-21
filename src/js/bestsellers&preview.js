import { createItem } from './ui';
import { closePopUp, openPopUp, changeBtn } from './buttons';
import { basket, popUpPreview, bestsellersList, previewImgFirst, previewImgSecond, 
	previewBrand, previewName, previewArticle, previewInitialPrice,previewFinallyPrice, 
	btnHeartInPreview, btnOrderInPreview, basketCounterInHeader, favoritesCounterInHeader, 
	btnOpenBasketInPreview, btnHeartRightInPreview, btnHeartLeftInPreview } from './elements_in_DOM';
import { IN_BASKET_KEY, IS_LIKED_KEY, MOCKAPI_URL } from './constants';

//работа с сервером (mockapi). получение всех элементов
export async function fetchItemsInBestsellers() {
	let content = await fetch(MOCKAPI_URL)
		.then(res => res.json());

	const renderProducts = new Promise((res, rej) => {
		res(renderListOfBestsellers(content))
	});
	renderProducts
		.then(getButtonsHeartInBestsellers())
		.then(addToBasket());
};

//отображение на экране
function renderListOfBestsellers(list) {
	bestsellersList.innerHTML = '';

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
				btnOrderInPreview.setAttribute('data-idOrderPreview', `${list[item].id}`);
				btnHeartInPreview.setAttribute('data-idHeartPreview', `${list[item].id}`);
				btnHeartRightInPreview.setAttribute('data-idHeartPreview', `${list[item].id}`);
				btnHeartLeftInPreview.setAttribute('data-idHeartPreview', `${list[item].id}`);

				//изменение стилей сердечка (лайкнуто или нет) аналогично сердцу в bestsellers
				changeStyleBtnHeart(btnHeartInPreview);

				//открытие корзины при нажатии накнопку "перейти в корзину"
				btnOpenBasketInPreview.addEventListener('click', () => {
					closePopUp(popUpPreview);
					changeBtn(btnOpenBasketInPreview, btnOrderInPreview);
					clearParams();
					openPopUp(basket);
				});
			});

		//закрытие попапа	
		popUpPreview
			.querySelector('.preview__btn-close')
			.addEventListener('click', () => {
				closePopUp(popUpPreview);
				changeBtn(btnOpenBasketInPreview, btnOrderInPreview);
				clearParams();
			});
	};
};

btnOrderInPreview.addEventListener('click', (e) => {
	const id = e.target.getAttribute('data-idOrderPreview');
	console.log(id)
	changeBtn(btnOrderInPreview, btnOpenBasketInPreview);
	addToLocalStorageSeveral(id, IN_BASKET_KEY);
});

//у сердечка есть 2 части, поэтому вешаем по слушателю на каждую
btnHeartRightInPreview.addEventListener('click', (e) => {
	const id = e.target.getAttribute('data-idHeartPreview');
	changeStylesHeartInPreview(id);
});

//у сердечка есть 2 части, поэтому вешаем по слушателю на каждую
btnHeartLeftInPreview.addEventListener('click', (e) => {
	const id = e.target.getAttribute('data-idHeartPreview');
	changeStylesHeartInPreview(id);
});

function changeStylesHeartInPreview(id) {
	addToLocalStorageIsLiked(id, IS_LIKED_KEY);
	changeStyleBtnHeart(btnHeartInPreview);

	let btnsHeart = Array.from(bestsellersList.querySelectorAll('.btn-heart'));

	//изменение стилей аналогичной кнопки в bestsellers
	for (let btn in btnsHeart) {
		
		if (+btn + 1 == id) {
			changeStyleBtnHeart(btnsHeart[btn]);
		};
	};
};

//очистка preview
function clearParams() {
	previewImgFirst.src = '';
	previewImgSecond.src = '';
	previewBrand.innerHTML = '';
	previewName.innerHTML = '';
	previewArticle.innerHTML = '';
	previewInitialPrice.innerHTML = '';
	previewFinallyPrice.innerHTML = '';
	btnHeartInPreview.removeAttribute('data-idHeartPreview');
	btnOrderInPreview.removeAttribute('data-idOrderPreview');
};

function addToBasket() {
	//находим все кнопки "добавить в корзину" в бестселлерах
	const btnsOrderInBestsellers = Array
		.from(bestsellersList
		.querySelectorAll('.bestsellers__btn-order'));

	for (let btn in btnsOrderInBestsellers) {
		//ключ элемент в object, т.к. id начинаются с 1, а btn с 0
		let id = +btn + 1;

		btnsOrderInBestsellers[btn].addEventListener('click', () => {
			addToLocalStorageSeveral(id, IN_BASKET_KEY)
		});
	};
};

//сохранение в LocalStorage из секции bestsellers
function addToLocalStorageSeveral(id, key) {
	let object;

	//проверка наличия в LocalStorage
	if (localStorage.getItem(key)) {
		object = JSON.parse(localStorage.getItem(key));
	} else {
		//без этого условия, если из LocalStorage ничего не приходит,
		// первый элемент будет null
		object = {};
	};

	//значение ключа в object
	if (object[id]) {
		object[id] += 1;
	} else {
		object[id] = 1;
	};

	localStorage.setItem(key, JSON.stringify(object));

	getQuantityOfGoods(key, basketCounterInHeader);
};

//выведение общего кол-ва товаров в хедер (в значок)
export function getQuantityOfGoods(key, place) {
	let quantity;

	//получение общего кол-ва товаров 
	if (localStorage.getItem(key)) {
		quantity = Object
			.values(JSON.parse(localStorage.getItem(key)))
			.reduce((acc, cur) => acc + cur);
	} else {
		quantity = 0;
	};

	place.innerText = quantity;
};

function getButtonsHeartInBestsellers() {
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

function changeStyleBtnHeart(btn) {
	let object;
	const id = btn.getAttribute('data-idHeartPreview');

	if (localStorage.getItem(IS_LIKED_KEY)) {
		object = JSON.parse(localStorage.getItem(IS_LIKED_KEY));
	} else {
		//без этого условия, если из LocalStorage ничего не приходит, 
		//первый элемент будет null
		object = {};
	};

	if (!object[id] || (object[id] == 0)) {
		changeStyleRemove(btn)
	} else {
		changeStyleAdd(btn)
	};
};

function changeStyleAdd(btn) {
	const leftPart = btn.querySelector('.btn-heart__left');
	const rightPart = btn.querySelector('.btn-heart__right');

	btn.classList.add('btn-heart--success');
	leftPart.classList.add('btn-heart__left--success');
	rightPart.classList.add('btn-heart__right--success');
};

function changeStyleRemove(btn) {
	const leftPart = btn.querySelector('.btn-heart__left');
	const rightPart = btn.querySelector('.btn-heart__right');

	btn.classList.remove('btn-heart--success');
	leftPart.classList.remove('btn-heart__left--success');
	rightPart.classList.remove('btn-heart__right--success');
};

//сохранение в LocalStorage лайкнутых элементов
function addToLocalStorageIsLiked(id, key) {
	let object;

	//проверка наличия в LocalStorage
	if (localStorage.getItem(key)) {
		object = JSON.parse(localStorage.getItem(key));
	} else {
		//без этого условия, если из LocalStorage ничего не приходит, 
		//первый элемент будет null
		object = {};
	};

	//значение ключа в object
	if (!object[id] || (object[id] == 0)) {
		object[id] = 1;
	} else {
		object[id] = 0;
	};

	localStorage.setItem(key, JSON.stringify(object));

	getQuantityOfGoods(key, favoritesCounterInHeader);
};