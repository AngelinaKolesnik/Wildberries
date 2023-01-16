import {basket,btnCloseBasket,btnOpenBasket,body, basketList, itemInBasket} from './elements_in_DOM';


//откр и закр корзину

btnOpenBasket.addEventListener('click', showBasket)
btnCloseBasket.addEventListener('click', closeBasket)

//открытие корзины через хэдер
function showBasket (){
  basket.classList.remove('none')
  body.style.overflow = 'hidden';
}

//закрытие корзины 
function closeBasket (){
  basket.classList.add('none')
  body.style.overflow = 'auto';
}

//добавляем товары в корзину, у которых inBasket - true

export let renderBasketList = (list, place) => {
  console.log(list);
  for (let item in list) {
    console.log(list[item])
    let finallyPrice = (list[item].price * (100 - list[item].discount) / 100).toFixed(2);
    place.insertAdjacentHTML('beforeend', createItemInBasket(list[item], finallyPrice))
  }
  
}
  
   export const createItemInBasket = ({ name, price, brand, itemPhoto, itemPhoto_2, liked, inBasket, id}, finallyPrice) => {
  return `<li class="basket__item">
 <div class="basket__item-img-name">
  <img class="basket__item-img" src="${itemPhoto}" alt="product">
  <h3 class="basket__item-name">${brand} ${name}</h3>
 </div>
 <div class="basket__item-price-btnDelete">
  <div class="basket__with-discount">${finallyPrice} р</div>
  <div class="basket__without-discount">${price} р</div>
  <button class="basket__btn-deleteItem">Удалить</button>
 </div>
</li>`
 }
    



