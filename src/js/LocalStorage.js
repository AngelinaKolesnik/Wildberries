import { basketCounterInHeader, favoritesCounterInHeader } from './elements_in_DOM';

//сохранение в LocalStorage лайкнутых элементов
export function addToLocalStorageIsLiked(id, key) {
	let object;

	//проверка наличия в LocalStorage
	if (localStorage.getItem(key)) {
		object = JSON.parse(localStorage.getItem(key));
	} else {
		//без этого условия, если из LocalStorage ничего не приходит, 
		//первый элемент будет null
		object = {};
	};

	//значение ключа в object
	if (!object[id]) {
		object[id] = 1;
	} else {
		delete object[id]
	};

	localStorage.setItem(key, JSON.stringify(object));

	getQuantityOfGoods(key, favoritesCounterInHeader);
};

//сохранение в LocalStorage из секции bestsellers
export function addToLocalStorageSeveral(id, key) {
	let object;

	//проверка наличия в LocalStorage
	if (localStorage.getItem(key)) {
		object = JSON.parse(localStorage.getItem(key));
	} else {
		//без этого условия, если из LocalStorage ничего не приходит,
		// первый элемент будет null
		object = {};
	};

	//значение ключа в object
	if (object[id]) {
		object[id] += 1;
	} else {
		object[id] = 1;
	};

	localStorage.setItem(key, JSON.stringify(object));

	getQuantityOfGoods(key, basketCounterInHeader);
};

export function getQuantityOfGoods(key, place) {
	let quantity;

	//получение общего кол-ва товаров 
	if (localStorage.getItem(key) == '{}') {
		quantity = 0;
	} else if (localStorage.getItem(key)) {
		quantity = Object
			.values(JSON.parse(localStorage.getItem(key)))
			.reduce((acc, cur) => acc + cur);
	} else {
		quantity = 0;
	}

	place.innerText = quantity;
};

export function clearLocalStorage(key) {
	let object = {};
	localStorage.setItem(key, JSON.stringify(object));
};