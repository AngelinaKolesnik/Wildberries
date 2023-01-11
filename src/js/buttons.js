import {popUpPreview} from './elements_in_DOM';

//open pop-up
let openPopUp = (collectionOfBtns, background) => {
	for (let btn of collectionOfBtns) {
		btn.addEventListener('click', () => {
			popUpPreview.style.display = 'flex';
			background.style.overflow = 'hidden';
		});
	};
};
export {openPopUp};

//close pop-up
let closePopUpUsingBtn = (btn, background) => {
	btn.addEventListener('click', () => {
		popUpPreview.style.display = 'none';
		background.style.overflow = 'auto';
	});
};
export {closePopUpUsingBtn};