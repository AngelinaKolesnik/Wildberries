import { createItem } from './ui';
import { closePopUp, openPopUp, changeLikedInBestsellers, changeLikedInPreview } from './buttons';
import { popUpPreview, bestsellersList, popUpImg, popUpBrand, popUpName, popUpArticle, popUpInitialPrice, popUpFinallyPrice, btnHeartInDOM } from './elements_in_DOM';

//отображение на экране
export function renderListOfBestsellers(list) {
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
				popUpImg.src = list[item].itemPhoto;
				popUpBrand.innerHTML = `${list[item].brand} /`;
				popUpName.innerHTML = list[item].name;
				popUpArticle.innerHTML = list[item].id;
				popUpInitialPrice.innerHTML = `${list[item].price} $`;
				popUpFinallyPrice.innerHTML = `${finallyPrice} $`;
				btnHeartInDOM.dataset.liked = `${list[item].liked}`;
				btnHeartInDOM.dataset.idHeart = `${list[item].id}`;

				//изменение сердечка
				changeBtnHeart(btnHeartInDOM);
				let btnId = btnHeartInDOM.getAttribute('id') ?? btnHeartInDOM.dataset.idHeart;
				let btnLiked;

				if (btnHeartInDOM.dataset.liked == 'true') {
					btnLiked = true;
				} else {
					btnLiked = false;
				};

				btnHeartInDOM.addEventListener('click', () => {
					changeLikedInPreview(btnId, btnLiked)
				})
			});

		//закрытие попапа	
		popUpPreview
			.querySelector('.preview__btn-close')
			.addEventListener('click', () => closePopUp(popUpPreview));
	};
};

export function renderPreview(item) {
	openPopUp(popUpPreview);
console.log(popUpPreview)
	//итоговая цена
	let finallyPrice = (item.price * (100 - item.discount) / 100).toFixed(2);

	//установка параметров попапа
	popUpImg.src = item.itemPhoto;
	popUpBrand.innerHTML = `${item.brand} /`;
	popUpName.innerHTML = item.name;
	popUpArticle.innerHTML = item.id;
	popUpInitialPrice.innerHTML = `${item.price} $`;
	popUpFinallyPrice.innerHTML = `${finallyPrice} $`;
	btnHeartInDOM.dataset.liked = `${item.liked}`;
	btnHeartInDOM.dataset.idHeart = `${item.id}`;

	//изменение сердечка
	changeBtnHeart(btnHeartInDOM);
	let btnId = btnHeartInDOM.getAttribute('id') ?? btnHeartInDOM.dataset.idHeart;
	let btnLiked;

	if (btnHeartInDOM.dataset.liked == 'true') {
		btnLiked = true;
	} else {
		btnLiked = false;
	};
	btnHeartInDOM.addEventListener('click', () => {
		changeLikedInPreview(btnId, btnLiked)
	})

	//закрытие попапа	
	popUpPreview
		.querySelector('.preview__btn-close')
		.addEventListener('click', () => closePopUp(popUpPreview));
};

export function getButtonsWithoutInDOM() {
	let btnsHeart = Array.from(document.querySelectorAll('.btn-heart')).splice(1);

	btnsHeart.forEach((btn) => {
		changeBtnHeart(btn);
		let btnId = btn.getAttribute('id') ?? btn.dataset.idHeart;
		let btnLiked;

		if (btn.dataset.liked == 'true') {
			btnLiked = true;
		} else {
			btnLiked = false;
		};
		btn.addEventListener('click', () => {
			changeLikedInBestsellers(btnId, btnLiked)
		});
	});
};

export function changeBtnHeart(btn) {
	const btnHeartLeft = btn.querySelector('.btn-heart__left');
	const btnHeartRight = btn.querySelector('.btn-heart__right');

	if (btn.dataset.liked == 'true') {
		btn.classList.add('btn-heart--success');
		btnHeartLeft.classList.add('btn-heart__left--success');
		btnHeartRight.classList.add('btn-heart__right--success');
	} else {
		btn.classList.remove('btn-heart--success');
		btnHeartLeft.classList.remove('btn-heart__left--success');
		btnHeartRight.classList.remove('btn-heart__right--success');
	};
};