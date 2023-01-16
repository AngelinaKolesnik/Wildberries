import { updateItemInPreview, fetchItemsInBestsellers } from './index';
import { body } from './elements_in_DOM';

//применяется при взаимодействии с сердечком из preview
export const changeLikedInPreview = async (id, liked) => {
	await fetch(`https://63a861d5f4962215b580f1f2.mockapi.io/api/goods/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			liked: !liked,
		})
	})
		.then(response => response.json());

	updateItemInPreview(id);
};

//применяется при взаимодействии с созданными через JS кнопками
export const changeLikedInBestsellers = async (id, liked) => {
	await fetch(`https://63a861d5f4962215b580f1f2.mockapi.io/api/goods/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			liked: !liked,
		})
	})
		.then(response => response.json());

	fetchItemsInBestsellers();
};

export function openPopUp(popUp) {
	popUp.classList.remove('none');
	body.classList.add('hidden');
};

export function closePopUp(popUp) {
	popUp.classList.add('none');
	body.classList.remove('hidden');
};