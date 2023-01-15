import { createItem, createPreviewOfItem } from './ui';
import { changeStateForArray, changeStateForElement, changeItem, changeStyle } from './buttons';
import { body, previewPlace } from './elements_in_DOM';

//отображение на экране
export let renderListOfBestsellers = (list, place) => {
	place.innerHTML = ''

	for (let item in list) {
		//итоговая цена
		let finallyPrice = (list[item].price * (100 - list[item].discount) / 100).toFixed(2);

		//вставка элемента
		place.insertAdjacentHTML('beforeend', createItem(list[item], finallyPrice));

		//preview
		place
			.querySelector(`button[data-idPreview='${list[item].id}']`)
			.addEventListener('click', () => {
				//отображение preview
				previewPlace.innerHTML = createPreviewOfItem(list[item], finallyPrice);
				body.style.overflow = 'hidden';

				//сердечко и его дивы
				const btnHeart = previewPlace.querySelector('.btn-heart');
				const firstElement = btnHeart.querySelector('.btn-heart__left');
				const secondElement = btnHeart.querySelector('.btn-heart__right');
			
				//изменение внешнего вида сердечка
				changeStyle(btnHeart, firstElement, secondElement);

				//изменение значения liked
				changeStateForElement(btnHeart, list[item].id, list[item].liked);

				//закрытие при нажатии на кнопку
				previewPlace
					.querySelector(`button[data-idClose='${list[item].id}']`)
					.addEventListener('click', () => {
						previewPlace.innerHTML = '';
						body.style.overflow = 'auto';
						fetchItems() //!
					});

			});
	};

	let buttonsHeart = place.querySelectorAll('.btn-heart');
	buttonsHeart = Array.from(buttonsHeart);
	
	for (let btn of buttonsHeart) {
		// btn.addEventListener('click', () => {
			// let b = btn.getAttribute('id')
			// console.log(b, 1, btn.getAttribute('id'))
			// changeStateForArray(buttonsHeart);
			changeStateForArray(btn, +btn.getAttribute('id'), btn.dataset.liked)
		// })
	}
   //селекторы дивов в сердечке
   let firstElement = '.btn-heart__left';
   let secondElement = '.btn-heart__right';

   //изменение сердечка


	
	// console.log(buttonsHeart[1].getAttribute('id'))
};


//отображение на экране
export let renderPreview = (item, place) => {
	//итоговая цена
	let finallyPrice = (item.price * (100 - item.discount) / 100).toFixed(2);

	//отображение preview
	place.innerHTML = createPreviewOfItem(item, finallyPrice);
	body.style.overflow = 'hidden';

	//закрытие при нажатии на кнопку
	place
		.querySelector(`button[data-idClose='${item.id}']`)
		.addEventListener('click', () => {
			place.innerHTML = '';
			body.style.overflow = 'auto';
		});

	//сердечко и его дивы
	const btnHeart = place.querySelector('.btn-heart');
	const firstElement = btnHeart.querySelector('.btn-heart__left');
	const secondElement = btnHeart.querySelector('.btn-heart__right');

	//изменение внешнего вида сердечка
	changeStyle(btnHeart, firstElement, secondElement);
	console.log(item.liked);

	//изменение значения liked
	changeStateForElement(btnHeart, item.id, item.liked);
};

//отображение на экране
export let renderBestsellers = (item, place) => {
	//итоговая цена
	let finallyPrice = (item.price * (100 - item.discount) / 100).toFixed(2);

	//отображение preview
	place.innerHTML = createPreviewOfItem(item, finallyPrice);
	body.style.overflow = 'hidden';

	//закрытие при нажатии на кнопку
	place
		.querySelector(`button[data-idClose='${item.id}']`)
		.addEventListener('click', () => {
			place.innerHTML = '';
			body.style.overflow = 'auto';
		});

	//сердечко и его дивы
	const btnHeart = place.querySelector('.btn-heart');
	const firstElement = btnHeart.querySelector('.btn-heart__left');
	const secondElement = btnHeart.querySelector('.btn-heart__right');

	//изменение внешнего вида сердечка
	changeStyle(btnHeart, firstElement, secondElement);
	console.log(item.liked);

	//изменение значения liked
	changeStateForElement(btnHeart, item.id, item.liked);
};