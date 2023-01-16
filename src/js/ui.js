export const createItem = ({ name, price, brand, discount, itemPhoto, cartIcon, liked, inBasket, id }, finallyPrice) => {
	return `
	<div class="bestsellers__item">
		<div class="bestsellers__wrap">
			<img class="bestsellers__img" src="${itemPhoto}" alt="product">

			<button data-idPreview='${id}' class="bestsellers__preview-btn preview-btn">Быстрый просмотр</button>

			<div class="bestsellers__discount">-${discount}%</div>

			<button class="btn-heart" data-liked='${liked}' id='${id}'>
				<div class="btn-heart__left"></div>
				<div class="btn-heart__right"></div>
			</button>

			<button class="bestsellers__btn-to-basket" data-inBasket='${inBasket}'>
				<img src="${cartIcon}" alt="basket">
			</button>
		</div>

		<div class="price">
			<div class="price__with-discount">${finallyPrice} p.</div>
			<div class="price__without-discount">${price} p.</div>
		</div>

		<h3 class="bestsellers__brand">${brand}</h3>
		<h3 class="bestsellers__name">${name}</h3>
	</div>`;
};