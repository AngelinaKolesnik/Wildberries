import { fetchItems, fetchPreview } from './index';

export let changeStateForHeart = (btn, id, liked) => {
	btn.addEventListener('click', () => {
		changeLiked(id, liked);
	});
};

export let changeStateForHeartInBestsellers = (btn, id, liked) => {
	btn.addEventListener('click', () => {
		console.log(liked)
		changeLikedInBestsellers(id, liked);
	});
};

export let changeStateForInBasket = (btn, id, inBasket) => {
	btn.addEventListener('click', () => {
		changeInBasket (id, inBasket);
	});
};

// export let changeStateForArray  = (btn, id, liked) => {
// 	btn.addEventListener('click', () => {
// 		console.log(btn, id, liked)
// 		changeLiked(id, liked)
// 		fetchItems(id)
// 	});
// };


const changeLiked = async (id, liked) => {
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
	
	fetchPreview(id); 
};

const changeLikedInBestsellers = async (id, liked) => {
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
	
	fetchItems(); 
};

const changeInBasket  = async (id, inBasket ) => {
	console.log( inBasket)
		await fetch(`https://63a861d5f4962215b580f1f2.mockapi.io/api/goods/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				inBasket: !inBasket,
			})
		})
		.then(response => response.json());
		
		fetchPreview(id);
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
};