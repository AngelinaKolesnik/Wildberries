export const createItem = ({ name, price, brand, discount, itemPhoto, id }, finallyPrice) => {
	return `
	<li class="bestsellers__item">
		<div class="bestsellers__wrap">
			<img class="bestsellers__img" src="${itemPhoto}" alt="product">

			<button data-idPreview='${id}' class="bestsellers__preview-btn preview-btn">Быстрый просмотр</button>

			<div class="bestsellers__discount">-${discount}%</div>

			<button class="btn-heart btn-heart--${id}" data-idBtnHeart='${id}'>
				<div class="btn-heart__left"></div>
				<div class="btn-heart__right"></div>
			</button>

			<button class="bestsellers__btn-order">
			</button>
		</div>

		<div class="price">
			<div class="price__with-discount">${finallyPrice} p.</div>
			<div class="price__without-discount">${price} p.</div>
		</div>

		<h3 class="bestsellers__brand">${brand}</h3>
		<h3 class="bestsellers__name">${name}</h3>
	</li>`;
};