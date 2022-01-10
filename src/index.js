/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */

function delayPromise(seconds) {
  new Promise((resolve) => {
    setTimeout(() => resolve(), seconds * 1000);
  });
}

delayPromise(3);

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */

function loadAndSortTowns() {
  // const collatore = new Intl.Collator("ru-RU");

  return fetch(
    "https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json"
  )
    .then((response) => response.json())
    .then((towns) =>
      towns.sort(
        (a, b) => a.name.localeCompare(b.name) //collatore.compare(a.name, b.name)
      )
    );
}

loadAndSortTowns().then((towns) => console.log(towns));

export { delayPromise, loadAndSortTowns };
