
import {createItem, createPreviewOfItem} from './ui';
import {changeState, changeHeartStyle} from './buttons';
import {body, btnsHeart, bestsellersList, previewPlace} from './elements_in_DOM';

//отображение на экране
export let renderList = (list, place) => {
	for (let item in list) {
		place.insertAdjacentHTML('beforeend', createItem(list[item]));

		const btnOpenItem = place.querySelector(`button[data-idProduct='${list[item].id}']`);

		//открытие поп-апа (prewiew)
		btnOpenItem.addEventListener('click', () => {
			previewPlace.innerHTML = createPreviewOfItem(list[item]);
			body.style.overflow = 'hidden';

			const btnCloseItem = document.querySelector(`button[data-idClose='${list[item].id}']`);

			//закрытие поп-апа (preview)
			btnCloseItem.addEventListener('click', () => {
				previewPlace.innerHTML = '';
				body.style.overflow = 'auto';
			})
		});
	};
};