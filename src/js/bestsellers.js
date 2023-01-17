import { createItem } from './ui';
import { closePopUp, openPopUp } from './buttons';
import { popUpPreview, bestsellersList, previewImgFirst, previewImgSecond, previewBrand, previewName, previewArticle, previewInitialPrice, previewFinallyPrice, btnHeartInPreview, btnOrderInPreview, goodsCounterInHeader } from './elements_in_DOM';
import { IN_BASKET_KEY, IS_LIKED_KEY } from './constants';

//отображение на экране
export function renderListOfBestsellers(list) {
	bestsellersList.innerHTML = '';

	for (let item in list) {
		//итоговая цена
		let finallyPrice = (list[item].price * (100 - list[item].discount) / 100).toFixed(2);

		//вставка элемента
		bestsellersList.insertAdjacentHTML('beforeend', createItem(list[item], finallyPrice));

		const btnHeartInItem = bestsellersList.querySelector(`button[data-idBtnHeart='${list[item].id}']`);

		bestsellersList
			//открытие попапа
			.querySelector(`button[data-idPreview='${list[item].id}']`)
			.addEventListener('click', () => {
				openPopUp(popUpPreview);

				btnHeartInPreview.addEventListener('click', () => {
					changeHeartStylesInPreview(btnHeartInPreview, list[item].id, btnHeartInItem)
				});

				//установка параметров попапа
				previewImgFirst.src = list[item].itemPhoto;
				previewImgSecond.src = list[item].itemPhoto_2;
				previewBrand.innerHTML = `${list[item].brand} /`;
				previewName.innerHTML = list[item].name;
				previewArticle.innerHTML = list[item].id;
				previewInitialPrice.innerHTML = `${list[item].price} $`;
				previewFinallyPrice.innerHTML = `${finallyPrice} $`;
				btnHeartInPreview.classList.add(`btn-heart--${list[item].id}`);
				btnOrderInPreview.setAttribute('id', `${list[item].id}-btnToOrderInPreview`);

				let btnOrderId = parseInt(btnOrderInPreview.getAttribute('id'));


				addToLocalStorage(btnOrderInPreview, btnOrderId, IN_BASKET_KEY);


				if (btnHeartInItem.classList.contains(`btn-heart--${list[item].id}`) == btnHeartInPreview.classList.contains(`btn-heart--${list[item].id}`) && btnHeartInItem.classList.contains('btn-heart--success')) {
					// const btnHeartLeft = btnHeartInPreview.querySelector('.btn-heart__left');
					// const btnHeartRight = btnHeartInPreview.querySelector('.btn-heart__right');

					// btnHeartInPreview.classList.add('btn-heart--success');
					// btnHeartLeft.classList.add('btn-heart__left--success');
					// btnHeartRight.classList.add('btn-heart__right--success');
					changeStyleAdd(btnHeartInPreview);

				} else if (btnHeartInItem.classList.contains(`btn-heart--${list[item].id}`) == btnHeartInPreview.classList.contains(`btn-heart--${list[item].id}`) && !btnHeartInItem.classList.contains('btn-heart--success')) {
					// const btnHeartLeft = btnHeartInPreview.querySelector('.btn-heart__left');
					// const btnHeartRight = btnHeartInPreview.querySelector('.btn-heart__right');

					// btnHeartInPreview.classList.remove('btn-heart--success');
					// btnHeartLeft.classList.remove('btn-heart__left--success');
					// btnHeartRight.classList.remove('btn-heart__right--success');
					changeStyleRemove(btnHeartInPreview);
				};
			});

		//закрытие попапа	
		popUpPreview
			.querySelector('.preview__btn-close')
			.addEventListener('click', () => closePopUp(popUpPreview));
	};
};

export function addToBasket() {
	//находим все кнопки "добавить в корзину" в бестселлерах
	const btnsOrderInBestsellers = Array.from(bestsellersList.querySelectorAll('.bestsellers__btn-order'));

	for (let btn in btnsOrderInBestsellers) {
		//ключ элемент в array, т.к. id начинаются с 1, а btn с 0
		let id = +btn + 1;

		addToLocalStorage(btnsOrderInBestsellers[btn], id, IN_BASKET_KEY);
	};
};

export function addToLocalStorage(btn, id, key) {
	btn.addEventListener('click', () => {
		let array = [];

		//проверка наличия чего-нибудь в LocalStorage
		if (localStorage.getItem(key)) {
			array = JSON.parse(localStorage.getItem(key))
		} else {
			//без этого условия, если из LocalStorage ничего не приходит, первый элемент будет null
			array = {};
		};

		//значение ключа в array
		if (array[id]) {
			array[id] += 1;
		} else {
			array[id] = 1;
		};

		localStorage.setItem(key, JSON.stringify(array));

		getQuantityOfGoods(key);
	});
};

export function getQuantityOfGoods(key) {
	let quantity;

	//получение общего кол-ва товаров 
	if (localStorage.getItem(key)) {
		quantity = Object.values(JSON.parse(localStorage.getItem(key))).reduce((acc, cur) => acc + cur);
	} else {
		quantity = 0;
	};

	//выведение общего кол-ва товаров в хедер (в значок)
		goodsCounterInHeader.innerText = quantity;
};




export function getButtonsHeartInBestsellers() {
	let btnsHeart = Array.from(bestsellersList.querySelectorAll('.btn-heart'));

	for (let btn in btnsHeart) {
		btnsHeart[btn].addEventListener('click', () => {
			console.log(btnsHeart[btn])
			changeHeartStyles(btnsHeart[btn], btn)
		});
	};
};

function changeHeartStyles(btn, id) {
	btn.classList.toggle('btn-heart--success');

	if (btn.classList.contains('btn-heart--success')) {
		changeStyleAdd(btn);
	} else {
		changeStyleRemove(btn);
	};

	if (btn.classList.contains(`btn-heart--${id}`) == btnHeartInPreview.classList.contains(`btn-heart--${id}`) && btn.classList.contains('btn-heart--success')) {
		changeStyleAdd(btnHeartInPreview);

	} else if (btn.classList.contains(`btn-heart--${id}`) == btnHeartInPreview.classList.contains(`btn-heart--${id}`) && !btn.classList.contains('btn-heart--success')) {
		changeStyleRemove(btnHeartInPreview);
	};
};

function changeHeartStylesInPreview(btn, id, btnInBestsellersList) {
	btn.classList.toggle('btn-heart--success');

	if (btn.classList.contains('btn-heart--success')) {
		changeStyleAdd(btn);
	} else {
		changeStyleRemove(btn);
	};

	if (btn.classList.contains(`btn-heart--${id}`) === btnInBestsellersList.classList.contains(`btn-heart--${id}`) && btn.classList.contains('btn-heart--success')) {
		changeStyleAdd(btnInBestsellersList);

	} else if (btn.classList.contains(`btn-heart--${id}`) === btnInBestsellersList.classList.contains(`btn-heart--${id}`) && !btn.classList.contains('btn-heart--success')) {
		changeStyleRemove(btnInBestsellersList);
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
}