//? сердечко
let changeState = (arrayOfBtns) => {
	for (let btn of arrayOfBtns) {
		btn.addEventListener('click', (e) => {
			e.target.classList.toggle('btn--pressed');
			
		});

		console.log(btn)
		// if (e.target.classList.contains('btn--pressed')) {
		// 	console.log(btn)
		// 	// btn.style.color = '$purple';
		// 	btn.style.boxShadow = 'none';
		// };

		// changeHeartStyle(Array.from(btnsHeart));
	};
};
export {changeState};

let changeHeartStyle = (arrayOfBtns) => {
	// console.log(arrayOfBtns[0])
	for (let btn of arrayOfBtns) {
		if (btn.classList.contains('btn--pressed')) {
			// console.log(btn)
			// btn.style.color = '$purple';
			btn.style.boxShadow = 'none';
		};
	};
};
export {changeHeartStyle};
