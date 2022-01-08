/* ДЗ 5 - DOM Events */

/*
 Задание 1:

 Функция должна добавлять обработчик fn события eventName к элементу target

 Пример:
   addListener('click', document.querySelector('a'), () => console.log('...')) // должна добавить указанный обработчик кликов на указанный элемент
 */

function addListener(eventName, target, fn) {
  target.addEventListener(eventName, fn);
}

addListener("click", document.querySelector("a"), () =>
  console.log("Add listener")
);

/*
 Задание 2:

 Функция должна удалять у элемента target обработчик fn события eventName

 Пример:
   removeListener('click', document.querySelector('a'), someHandler) // должна удалить указанный обработчик кликов на указанный элемент
 */

function removeListener(eventName, target, fn) {
  target.removeEventListener(eventName, fn);
}

function someHandler() {
  console.log("Remove listener");
}

removeListener("click", document.querySelector("a"), someHandler);

/*
 Задание 3:

 Функция должна добавить к элементу target такой обработчик на события eventName, чтобы он отменял действия по умолчанию

 Пример:
   skipDefault('click', document.querySelector('a')) // после вызова функции, клики на указанную ссылку не должны приводить к переходу на другую страницу
 */

function skipDefault(eventName, target) {
  target.addEventListener(eventName, (event) => event.preventDefault());
}

skipDefault("click", document.querySelector("a"));

/*
 Задание 4:

 Функция должна эмулировать событие click для элемента target

 Пример:
   emulateClick(document.querySelector('a')) // для указанного элемента должно быть сэмулировано события click
 */

function emulateClick(target) {
  target.dispatchEvent(new MouseEvent("click"));
}

emulateClick(document.querySelector("a"));

/*
 Задание 5:

 Функция должна добавить такой обработчик кликов к элементу target,
 который реагирует (вызывает fn) только на клики по элементам BUTTON внутри target

 Пример:
   delegate(document.body, () => console.log('кликнули на button')) // добавит такой обработчик кликов для body, который будет вызывать указанную функцию только если кликнули на кнопку (элемент с тегом button)
 */

function delegate(target, fn) {
  target.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      fn();
    }
  });
}

delegate(document.body, () => console.log("кликнули на button"));

/*
 Задание 6:

 Функция должна добавить такой обработчик кликов к элементу target,
 который сработает только один раз и удалится (перестанет срабатывать для последующих кликов по указанному элементу)

 Пример:
   once(document.querySelector('button'), () => console.log('обработчик выполнился!')) // добавит такой обработчик кликов для указанного элемента, который вызовется только один раз и затем удалится
 */

function once(target, fn) {
  // let already = false;

  // target.addEventListener("click", () => {
  //   if (!already) {
  //     fn();
  //     already = true;
  //   }
  // });

  target.addEventListener("click", fn, { once: true });
}

once(document.querySelector("button"), () =>
  console.log("обработчик выполнился!")
);

export {
  addListener,
  removeListener,
  skipDefault,
  emulateClick,
  delegate,
  once,
};
