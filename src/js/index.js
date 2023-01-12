// // // <<<<<<< HEAD
// // console.log("S.E")

// // console.log (ДГ)
// // console.log("S.E")
// // console.log(D.S)
// // // >>>>>>> 9bac312abf938d2ced71d3f1ffff276ed9675a6d

// let inputEnter = document.getElementById("input-enter");
// let headerSearch = document.getElementById("header-search")
// let searchWords = document.getElementById("search-words")                             
// const basket = document.getElementById("basket");
// let goods = document.getElementById("goods");

// let list =[];
// let search = [];
// let result;
// let result_arr;
// const locale_HTML =  document.body.innerHTML; 

// const searchGoods = [];
// const basketGoods = [];

// function goodsSearch(e) {
// 	if (e.value != '') {
// 		search = [...list].filter((el) => el.title.toLowerCase().includes(e.value.toLowerCase()));
// 	} else {
// 		search = [...list];
// 	};

// 	localStorage.setItem(SEARCH, JSON.stringify(search));
// 	search = JSON.parse(localStorage.getItem(search));
// 	(search);
// };

// // function FindOnPage(name, status) {

// //     if(status) { FindOnPageBack(); FindOnPageGo(); } //чистим прошлое и Выделяем найденное
// // if(!status) { FindOnPageBack(); } //Снимаем выделение
// // }


// function FindOnPage(name, status) {

// 	inputEnter = document.getElementById(name).value; //получаем значение из поля в html
	
// 	if(inputEnter.length<3&&status==true) {
// 		alert('Для поиска вы должны ввести три или более символов');
// 		function FindOnPageBack() { document.body.innerHTML = locale_HTML; }   //обнуляем стили
// 	}
//     if(inputEnter.length>=3)
// 	{
//         function FindOnPageGo() {
//             search = '/'+inputEnter+'/g';  //делаем из строки регуярное выражение
//         current = document.body.innerHTML;   // сохраняем в переменную весь body
//         result = current.match(/>(.*?)</g);  //отсекаем все теги и получаем только текст
//         result_arr = [];   //в этом массиве будем хранить результат работы (подсветку)
//         }

//         //выполняем поиск
//     }
        
//         function FindOnPageBack() { document.body.innerHTML = locale_HTML; }   //обнуляем стили
//         if(status) { FindOnPageBack(); FindOnPageGo(); } //чистим прошлое и Выделяем найденное
// 	if(!status) { FindOnPageBack(); } //Снимаем выделение
// }

// function getInputValue()  {
//     if (keyCode === 13) {
//         searchGoods.push(inputEnter.value);
//     }
//     else {
//         alert("Введите еще раз");
//     }
//     getInputValue();
// }



// document.getElementById("input-enter")
//     .addEventListener("keyup", function(e) {
//         if (e.code === 'Enter') {
//             document.getElementById("search").click();
//             return;
//         }
//     });
//     // inputEnter.value;
// document.getElementById("search").onclick = function() {
//     searchGoods.push(inputEnter.value);
//     // inputEnter.value;
// }


// searchWords.onclick = () => {
//     searchGoods.push(inputEnter);
//     headerSearch.innerHTML = searchGoods;
// }


// const inputEnter = document.getElementById("input-enter");

