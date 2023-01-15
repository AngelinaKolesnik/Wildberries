import { fetchItems, fetchPreview } from './index';

export let changeStateForElement = (btn, id, liked) => {
	btn.addEventListener('click', () => {
		
		changeItem(id, liked)
		// // console.log(11111111, liked)
		// fetchPreview(id)
	});
};

export let changeStateForArray  = (btn, id, liked) => {
	console.log(liked)
	btn.addEventListener('click', () => {
		console.log(btn, id, liked)
		changeItem(id, liked)
		fetchItems(id)
	});
};


const changeItem = async (id, liked) => {
// console.log( liked)
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
	
	fetchPreview(id) 
};

const changeItem1 = async (id, liked) => {
	// console.log( liked)
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
		
		fetchItems() 
	};

export const changeStyle = (btn, firstElement, secondElement) => {
	if (btn.dataset.liked == "true") {
		btn.style.boxShadow = 'none';
		firstElement.style.background = '#cb11ab';
		secondElement.style.background = '#cb11ab';
	} else {
		btn.style.boxShadow = '0 0 10px 12px #ffbbf3';
		firstElement.style.background = '#fff';
		secondElement.style.background = '#fff';
	};
}