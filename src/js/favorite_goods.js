import { btnHeartInHeader, popUpFavoriteGoods, favoriteGoodsBtnClose, favoriteGoodsList } from './elements_in_DOM';
import { closePopUp, openPopUp } from './buttons';
import { IS_LIKED_KEY, MOCKAPI_URL } from './constants';
import { createLikedElements } from './ui';

btnHeartInHeader.addEventListener('click', () => {
	openPopUp(popUpFavoriteGoods);
	getFavoriteGoods();
});

favoriteGoodsBtnClose.addEventListener('click', () => {
	closePopUp(popUpFavoriteGoods);
});

async function getFavoriteGoods() {
	let favorites = JSON.parse(localStorage.getItem(IS_LIKED_KEY));

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
		console.log(favoriteGoods)
	};



	Promise.all(favoriteGoods.map((el) =>
		fetch(el)
			.then(res => res.json())
	))
		.then((list) => {
			favoriteGoodsList.innerHTML = '';

			list.forEach((item) => {
				let finallyPrice = (item.price * (100 - item.discount) / 100).toFixed(2);

				favoriteGoodsList.innerHTML += createLikedElements(item, finallyPrice);
			});
		});
};