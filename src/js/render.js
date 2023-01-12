
import {createItem} from './ui';

//отображение на экране
export let renderList = (list, place) => {
	for (let item in list) {
		place.insertAdjacentHTML('beforeend', createItem(list[item]));
	};
};