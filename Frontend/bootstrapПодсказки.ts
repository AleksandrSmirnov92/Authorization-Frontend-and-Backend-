/**
 если мы хотим чтобы наша сетка начала работать мы можем задать для нашего div
 <div class = "container"></div>
 <div class = "container border"></div> - добовляет поля нашему контейнеру
 <div class = "container-fluid border"></div> - использует контейнер на всю ширину
 <div class = "container-md border"></div> - точки остановы на 	720 пикселей	960 пикселей	1140 пикселей	1320 пикселей если ниже ничинает себя ввести как fluid тоесть на весь экран
 остальные свойства https://getbootstrap.com/docs/5.2/layout/containers/
 Grid(Сетка) - сетка состоит из рядов 
 <div class = "row"> - создает ряд
 <div class = "col"></div> создает столбец в итоге у нас получилось один ряд с тремя столбцами
 <div class = "col"></div>
 <div class = "col"></div>
 </div> 
 <style>
 [class="col"] {
    padding:1px,
    background-color: black,
    и тд....
 }
 </style>
так же мы можем задавать ширину col-4,5,6 это значит будет соотвествовать ширене 4 5 или 6 единицам 
https://getbootstrap.com/docs/5.2/layout/grid/

выравнивание 
https://getbootstrap.com/docs/5.2/layout/columns/

растояние между колонками
<div class = "gx - 5 gy - 7"></div> делает отступы между элементами по оси y и x
https://getbootstrap.com/docs/5.2/layout/gutters/

Компоненты
1 Buttons
<button class="btn btn-primary"></button>




две функции для отправки формы 
// ---------------------------------------------signUp
// function sendPostSignUp() {
//   fetch("http://localhost:3000/home", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       nameClassButton: state.nameClassButton,
//       state: state.valuesSignUp,
//     }),
//   })
//     .then((responce) => responce.json())
//     .then((responce) => {
//       if (responce.status === "SUCCESS") {
//         setTimeout(() => {
//           window.location.href = "http://localhost:3000/home";
//         }, 1000);
//       } else {
//         let message: string = responce.message;
//         errorServerForSignUp.innerHTML = `<h5>${message}</h5>`;
//         setTimeout(() => {
//           errorServerForSignUp.innerHTML = "";
//         }, 2000);
//       }
//     });
// }
// function sendPostSignIn() {
//   fetch("http://localhost:3000/home", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       nameClassButton: state.nameClassButton,
//       state: state.values,
//     }),
//   })
//     .then((responce) => responce.json())
//     .then((responce) => {
//       if (responce.status === "SUCCESS") {
//         setTimeout(() => {
//           window.location.href = "http://localhost:3000/home";
//         }, 1000);
//       } else {
//         let message: string = responce.message;
//         errorServer.innerHTML = `<h5>${message}</h5>`;
//         setTimeout(() => {
//           errorServer.innerHTML = ``;
//         }, 2000);
//       }
//     });
// }











































 */
