export const createItem = ({ name, price, brand, discount, itemPhoto, cartIcon, liked, inBasket, id}, finallyPrice) => {
	return `
	<div class="bestsellers__item">
		<div class="bestsellers__wrap">
			<img class="bestsellers__img" src="${itemPhoto}" alt="product">

			<button data-idPreview='${id}' class="bestsellers__preview-btn preview-btn">Быстрый просмотр</button>

			<div class="bestsellers__discount">-${discount}%</div>

			<button class="btn-heart" data-liked='${liked}' id='${id}'>
				<div class="btn-heart__left"></div>
				<div class="btn-heart__right" data-idHeartRight='${id}'></div>
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

export const createPreviewOfItem = ({ name, price, brand, itemPhoto, itemPhoto_2, liked, inBasket, id}, finallyPrice) => {
	return `
	<section class="preview">
	<div class="container">
		<div class="preview__carousel">
			<button class="arrow arrow--prev">
				<div class="arrow__line"></div>
			</button>

			<div class="preview__wrap">
				<div class="preview__slider-img">
					<img src="${itemPhoto}" alt="">
					<button class="arrow arrow--prev">
						<div class="arrow__line"></div>
					</button>
					<button class="arrow arrow--next">
						<div class="arrow__line"></div>
					</button>
				</div>

				<div class="preview__content">
					<button class="preview__btn-close btn-close" data-idClose="${id}"></button>
					<p class="preview__goods-description">
						<span class="preview__goods-brand">${brand} /</span>
						<span class="preview__goods-name">${name}</span>
					</p>
					<div class="preview__item-number">Артикул: <span>${id}</span></div>
					<div class="price">
						<div class="price__with-discount">${finallyPrice} p.</div>
						<div class="price__without-discount">${price} p.</div>
					</div>
					<div class="preview__order">
						<button class="btn-order" data-inBasket='${inBasket}'>Добавить в корзину</button>
						<button class="btn-heart" data-liked='${liked}'>
							<div class="btn-heart__left"></div>
							<div class="btn-heart__right"></div>
						</button>
					</div>
				</div>
			</div>

			<button class="arrow arrow--next">
				<div class="arrow__line"></div>
			</button>
		</div>
	</div>
	</section>`
};
