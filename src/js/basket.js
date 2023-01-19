import {basket,btnCloseBasket,btnOpenBasket,body, basketList, itemInBasket,btnDeleteItem} from './elements_in_DOM';


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

export const createItemInBasket = ({ name, price, brand, itemPhoto, itemPhoto_2, liked, inBasket, id}, finallyPrice) => {
  return `<li class="basket__item">
 <div class="basket__item-img-name">
    <img class="basket__item-img" src="${itemPhoto}" alt="product">
    
    <div class="basket__item-name-quantity">
      <h3 class="basket__brand">${brand}</h3>
      <h3 class="basket__name">${name}</h3>
      <div class="basket__quantity">
          <button class="basket__quantityMinus">-</button>
          <input type="number" class="basket__quantityNumber" placeholder = "1">
          <button class="basket__quantityPlus">+</button>
      </div>
    </div> 
  </div> 
 <div class="basket__item-price-btnDelete">
  <div class="basket__with-discount">${finallyPrice} р</div>
  <div class="basket__without-discount">${price} р</div>
  <button class="basket__btn-deleteItem" id="btnDeleteItem">Удалить</button>
 </div>
</li>`
 }

//добавляем товары в корзину, у которых inBasket - true

export let renderBasketList = (list, place) => {
//   console.log(list);
  for (let item in list) {
   //  console.log(list[item])
    let finallyPrice = (list[item].price * (100 - list[item].discount) / 100).toFixed(2);
    place.insertAdjacentHTML('beforeend', createItemInBasket(list[item], finallyPrice))

    // btnDeleteItem.addEventListener('click',changeInBasketForDel)

    // function changeInBasketForDel(item.inBasket){

    // }
  }
  
}



  

    

