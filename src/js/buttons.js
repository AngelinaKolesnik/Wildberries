import { body } from './elements_in_DOM';

export function openPopUp(popUp) {
	popUp.classList.remove('none');
	body.classList.add('hidden');
};

export function closePopUp(popUp) {
	popUp.classList.add('none');
	body.classList.remove('hidden');
};