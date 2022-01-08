/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector("#homework-container");

function random(from, to) {
  return parseInt(Math.random() * (to - from) + from);
}

let currentDrug;
let startX = 0;
let startY = 0;

document.addEventListener("mousemove", (e) => {
  if (currentDrug) {
    currentDrug.style.top = e.clientY - startY + "px";
    currentDrug.style.left = e.clientX - startX + "px";
  }
});

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */

function createDiv() {
  const div = document.createElement("div");
  const minSize = 20;
  const maxSize = 200;
  const maxColor = 0xffffff;

  div.className = "draggable-div";
  div.style.background = "#" + random(0, maxColor).toString(16);
  div.style.top = random(0, window.innerHeight) + "px";
  div.style.left = random(0, window.innerWidth) + "px";
  div.style.width = random(minSize, maxSize) + "px";
  div.style.height = random(minSize, maxSize) + "px";

  div.addEventListener("mousedown", (e) => {
    currentDrug = div;
    startX = e.offsetX;
    startY = e.offsetY;
  });
  div.addEventListener("mouseup", () => (currentDrug = false));

  return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */

// function addListeners(target) {
//   target.addEventListener("mousedown", (e) => {
//     currentDrug = target;
//     startX = e.offsetX;
//     startY = e.offsetY;
//   });

//   target.addEventListener("mouseup", () => (currentDrug = false));
// }

let addDivButton = homeworkContainer.querySelector("#addDiv");

addDivButton.addEventListener("click", function () {
  // создать новый div
  const div = createDiv();

  // добавить на страницу
  homeworkContainer.appendChild(div);

  // назначить обработчики событий мыши для реализации D&D
  // addListeners(div);

  // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
  // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export { createDiv };
