export const createItem = ({ name, price, brand, discount, itemPhoto, id }, finallyPrice) => {
	return `
	<li class="bestsellers__item">
		<div class="bestsellers__wrap">
			<img class="bestsellers__img" src="${itemPhoto}" alt="product">

			<button data-idPreview='${id}' class="bestsellers__preview-btn preview-btn">Быстрый просмотр</button>

			<div class="bestsellers__discount">-${discount}%</div>

			<button class="btn-heart" data-idHeartPreview='${id}'>
				<div class="btn-heart__left"></div>
				<div class="btn-heart__right"></div>
			</button>

			<button class="bestsellers__btn-order">
			</button>
		</div>

		<div class="price">
			<div class="price__with-discount">${finallyPrice} $</div>
			<div class="price__without-discount">${price} $</div>
		</div>

		<h3 class="bestsellers__brand">${brand}</h3>
		<h3 class="bestsellers__name">${name}</h3>
	</li>`;
};

export const createLikedElements = ({ name, price, brand, itemPhoto, id }, finallyPrice) => {
	return `
	<li class="favorite-goods__item">
		<div class="favorite-goods__product">
			<img class="favorite-goods__img" src="${itemPhoto}" alt="product">

			<div class="favorite-goods__about">
				<div class="favorite-goods__brand">${brand}</div>
				<div class="favorite-goods__name">${name}</div>
			</div>
		</div>

		<div class="favorite-goods__price">
			<div class="favorite-goods__with-discount">${finallyPrice} $</div>
			<div class="favorite-goods__without-discount">${price} $</div>
		</div>

		<div class="favorite-goods__actions">
			<button class="favorite-goods__delete-this" data-idRemoveFavorites='${id}'>удалить</button>
			<button class="favorite-goods__basket" data-idOrderFavorites='${id}'>в корзину</button>
		</div>
	</li>`;
};