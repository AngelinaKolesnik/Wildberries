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


//? сердечко
// let changeState = (collectionOfBtns) => {
// 	for (let btn of collectionOfBtns) {
// 		btn.addEventListener('click', (e) => {
// 			e.classList.toggle('btn--pressed');
// 		});
// 	};
// };
// export {changeState};

// let changeHeartStyle = (collectionOfBtns) => {
// 	for (let btn of collectionOfBtns) {
// 		if (btn.classList.contains('btn--pressed')) {
// 			btn.style.color = '$purple';
// 			btn.style.boxShadow = 'none';
// 		};
// 	};
// };
// export {changeHeartStyle};
