import { btnHeartInHeader, popUpFavoriteGoods, favoriteGoodsBtnClose } from './elements_in_DOM';
import { closePopUp, openPopUp } from './buttons';

btnHeartInHeader.addEventListener('click', () => {
	openPopUp(popUpFavoriteGoods);
});

favoriteGoodsBtnClose.addEventListener('click', () => {
	closePopUp(popUpFavoriteGoods);
});