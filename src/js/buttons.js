export let changeState = (arrayOfBtns, firstCssClass, secondCssClass) => {
	
	for (let btn of arrayOfBtns) {
		btn.addEventListener('click', (e) => {
			let firstElement = btn.querySelector(`${firstCssClass}`);
			let secondElement = btn.querySelector(`${secondCssClass}`);

			e.target.classList.toggle('btn--pressed');
			
			if (e.target.classList.contains('btn--pressed')) {
				btn.style.boxShadow = 'none';
				firstElement.style.background = '#cb11ab';
				secondElement.style.background = '#cb11ab';
			} else {
				btn.style.boxShadow = '0 0 10px 12px #ffbbf3';
				firstElement.style.background = '#fff';
				secondElement.style.background = '#fff';
			};
		});
	};
};