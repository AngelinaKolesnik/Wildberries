
import {createItem, createPreviewOfItem} from './ui';
import {changeState} from './buttons';
import {body, previewPlace} from './elements_in_DOM';

//отображение на экране
export let renderList = (list, place) => {
	for (let item in list) {
		//итоговая цена
		let finallyPrice = (list[item].price * (100 - list[item].discount) / 100).toFixed(2);

		//вставка элемента
		place.insertAdjacentHTML('beforeend', createItem(list[item], finallyPrice));

		const btnsHeart = document.querySelectorAll('.btn-heart');

		//селекторы дивов в сердечке
		let firstElement = '.btn-heart__left';
		let secondElement = '.btn-heart__right';

		//изменение сердечка
		changeState(Array.from(btnsHeart), firstElement, secondElement);
		
		const btnOpenItem = place.querySelector(`button[data-idProduct='${list[item].id}']`);

		//открытие поп-апа (prewiew)
		btnOpenItem.addEventListener('click', () => {
			previewPlace.innerHTML = createPreviewOfItem(list[item], finallyPrice);
			body.style.overflow = 'hidden';

			const btnCloseItem = document.querySelector(`button[data-idClose='${list[item].id}']`);
	
			btnCloseItem.addEventListener('click', () => {
				previewPlace.innerHTML = '';
				body.style.overflow = 'auto';
			});
			
			const btnsHeart = document.querySelectorAll('.btn-heart');

			changeState(Array.from(btnsHeart), firstElement, secondElement);
		});
	};
};