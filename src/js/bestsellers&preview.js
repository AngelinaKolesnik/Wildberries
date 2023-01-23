import { createItem } from './ui';
import { closePopUp, openPopUp, changeBtn } from './buttons';
import { basket, popUpPreview, bestsellersList, previewImgFirst, previewImgSecond, 
	previewBrand, previewName, previewArticle, previewInitialPrice,previewFinallyPrice, 
	btnHeartInPreview, btnOrderInPreview, btnOpenBasketInPreview, btnHeartRightInPreview, 
	btnHeartLeftInPreview, arrowNextPopUp, arrowPrevPopUp, arrowPrevImg, arrowNextImg } from './elements_in_DOM';
import { IN_BASKET_KEY, IS_LIKED_KEY, MOCKAPI_URL } from './constants';
import { addToLocalStorageIsLiked, addToLocalStorageSeveral } from './LocalStorage';

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
				productPhotos = [list[item].itemPhoto, list[item].itemPhoto_2]

				//установка параметров попапа
				previewImgFirst.src = productPhotos[0];
				previewImgSecond.src = productPhotos[1];
				previewBrand.innerHTML = `${list[item].brand} /`;
				previewName.innerHTML = list[item].name;
				previewArticle.innerHTML = list[item].id;
				previewInitialPrice.innerHTML = `${list[item].price} $`;
				previewFinallyPrice.innerHTML = `${finallyPrice} $`;
				btnOrderInPreview.setAttribute('data-idOrderPreview', `${list[item].id}`);
				btnHeartInPreview.setAttribute('data-idHeartPreview', `${list[item].id}`);
				btnHeartRightInPreview.setAttribute('data-idHeartPreview', `${list[item].id}`);
				btnHeartLeftInPreview.setAttribute('data-idHeartPreview', `${list[item].id}`);

				//кнопка вправо( перелистывание товаров)
				arrowNextPopUp.addEventListener('click', () => {
					item = +item+1;
					productPhotos = [list[item].itemPhoto, list[item].itemPhoto_2]
					
					previewImgFirst.src = productPhotos[0];
					previewImgSecond.src = productPhotos[1];
					previewBrand.innerHTML = `${list[item].brand} /`;
					previewName.innerHTML = list[item].name;
					previewArticle.innerHTML = list[item].id;
					previewInitialPrice.innerHTML = `${list[item].price} $`;
					previewFinallyPrice.innerHTML = `${(list[item].price * (100 - list[item].discount) / 100).toFixed(2)} $`;
					popUpPreview.setAttribute('id', `${list[item].id}-Preview`);
				});

				//кнопка влево( перелистывание товаров)
				arrowPrevPopUp.addEventListener('click', () => {
					item = +item-1;

					productPhotos = [list[item].itemPhoto, list[item].itemPhoto_2]
					previewImgFirst.src = productPhotos[0];
					previewImgSecond.src = productPhotos[1];
					previewBrand.innerHTML = `${list[item].brand} /`;
					previewName.innerHTML = list[item].name;
					previewArticle.innerHTML = list[item].id;
					previewInitialPrice.innerHTML = `${list[item].price} $`;
					previewFinallyPrice.innerHTML = `${(list[item].price * (100 - list[item].discount) / 100).toFixed(2)} $`;

				})

				// const arrImg = [previewImgFirst.src, previewImgSecond.src];
				// let slideImg = document.querySelectorAll(".preview__img");
				
				arrowNextImg.addEventListener('click', () => {
					previewImgFirst.src = productPhotos[1];
				})

				arrowPrevImg.addEventListener('click', () => {
					previewImgFirst.src = productPhotos[0];
				}) 

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

export function changeStyleBtnHeart(btn) {
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