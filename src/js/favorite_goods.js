import {
	btnHeartInHeader, popUpFavoriteGoods, favoriteGoodsBtnClose, favoriteGoodsList,
	favoriteGoodsDeleteAll, favoritesCounterInHeader, bestsellersList, favoriteGoodsSearchInput
} from './elements_in_DOM';
import { closePopUp, openPopUp } from './buttons';
import { IS_LIKED_KEY, MOCKAPI_URL, IN_BASKET_KEY } from './constants';
import { createLikedElements } from './ui';
import { clearLocalStorage, getQuantityOfGoods, addToLocalStorageSeveral, addToLocalStorageIsLiked 
} from './LocalStorage';
import { changeStyleBtnHeart } from './bestsellers&preview';

btnHeartInHeader.addEventListener('click', () => {
	openPopUp(popUpFavoriteGoods);
	getFavoriteGoods(IS_LIKED_KEY);
});

favoriteGoodsBtnClose.addEventListener('click', () => {
	closePopUp(popUpFavoriteGoods);
});

favoriteGoodsDeleteAll.addEventListener('click', () => {
	clearLocalStorage(IS_LIKED_KEY);
	renderPage();
});

function renderPage() {
	getFavoriteGoods(IS_LIKED_KEY);
	getQuantityOfGoods(IS_LIKED_KEY, favoritesCounterInHeader);

	let btnsHeart = Array.from(bestsellersList.querySelectorAll('.btn-heart'));

	for (let btn in btnsHeart) {
		changeStyleBtnHeart(btnsHeart[btn]);
	};
};

function getFavoriteGoods(key) {
	let favorites = JSON.parse(localStorage.getItem(key));

	for (let el of Object.keys(favorites)) {

		if (favorites[el] == 0) {
			delete favorites[el];
		};
	};

	let favoriteGoods = [];

	getParams(favorites);

	function getParams(obj) {
		Object.keys(obj).forEach((el) => {
			favoriteGoods.push(`${MOCKAPI_URL}/${el}`)
		});
	};

	Promise.all(favoriteGoods.map((el) =>
		fetch(el)
			.then(res => res.json())
	))
		.then((list) => { 
			renderFavorites(list);
		})

		Promise.all(favoriteGoods.map((el) =>
		fetch(el)
			.then(res => res.json())
	))
		.then((list) => {
			favoriteGoodsSearchInput.addEventListener('input', () => {
				let search;
				if (favoriteGoodsSearchInput.value.trim() != '') {
					search = [...list].filter((el) => {
						return el.brand.toLowerCase().includes(favoriteGoodsSearchInput.value.toLowerCase()) ||
						el.name.toLowerCase().includes(favoriteGoodsSearchInput.value.toLowerCase()) ||
						el.id.includes(favoriteGoodsSearchInput.value) 
					});
				} else {
					search = [...list];
				};

				renderFavorites(search);
			});
		});
};

function renderFavorites(list) {
	favoriteGoodsList.innerHTML = '';

	list.forEach((item) => {
		let finallyPrice = (item.price * (100 - item.discount) / 100).toFixed(2);

		favoriteGoodsList.innerHTML += createLikedElements(item, finallyPrice);
	});

	addToBasketInFavorites();
	removeElementInFavorites();
};

function addToBasketInFavorites() {
	const btnsOrderInFavorites = Array
		.from(favoriteGoodsList
			.querySelectorAll('.favorite-goods__basket'));

	btnsOrderInFavorites.forEach((btn) => {
		btn.addEventListener('click', () => {
			const id = btn.getAttribute('data-idOrderFavorites');
			addToLocalStorageSeveral(id, IN_BASKET_KEY);
		});
	});
};

function removeElementInFavorites() {
	const btnsRemoveInFavorites = Array
		.from(favoriteGoodsList
			.querySelectorAll('.favorite-goods__delete-this'));

	btnsRemoveInFavorites.forEach((btn) => {
		btn.addEventListener('click', () => {
			const id = btn.getAttribute('data-idRemoveFavorites');
			addToLocalStorageIsLiked(id, IS_LIKED_KEY);
			renderPage();
		});
	});
};