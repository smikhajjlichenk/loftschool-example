/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответсвует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

// let cookies
const cookies = getCookies()
let filteredCookie

updateTable()

function getCookies () {
    // cookies = document.cookie.split('; ').reduce((prev, current) => {
    //     const [name, value] = current.split('=')

    //     prev[name] = value

    //     return prev
    // }, {})
    return document.cookie.split('; ').filter(Boolean).map((cookie) => cookie.match(/^([^=]+)=(.+)/)).reduce((obj, [, name, value]) => {
        obj.set(name, value);

        return obj;
    }, new Map());
}

// getCookies()

filterNameInput.addEventListener('input', function() {
    filteredCookie = this.value
    updateTable()
});

addButton.addEventListener('click', () => {
    const name = encodeURIComponent(addNameInput.value.trim())
    const value = encodeURIComponent(addValueInput.value.trim())

    if (!name) {  
        return 
    }

    document.cookie = `${name}=${value}`
    addNameInput.value = ''
    addValueInput.value = ''

    // getCookies()
    cookies.set(name, value)

    updateTable()
});

listTable.addEventListener('click', (e) => {
    const { role, cookieName } = e.target.dataset

    if (role === 'remove-cookie') {
        // delete cookies[cookieName]
        cookies.delete(cookieName);
        document.cookie = `${cookieName}=deleted; max-age=0`
        updateTable()
    }
})

function updateTable () {
    const fragment = document.createDocumentFragment()

    listTable.innerHTML = '';

    // for (let cookie in cookies) {
    for (const [name, value] of cookies) {  
        // if (filteredCookie && !cookie.toLocaleLowerCase().includes(filteredCookie.toLocaleLowerCase()) && !cookies[cookie].toLocaleLowerCase().includes(filteredCookie.toLocaleLowerCase())) {
        if (
            filteredCookie &&
            !name.toLowerCase().includes(filteredCookie.toLowerCase()) &&
            !value.toLowerCase().includes(filteredCookie.toLowerCase())
        ) {  
            continue
        }
        const tr = document.createElement('tr')
        const nameTD = document.createElement('td')
        const valueTD = document.createElement('td')
        const removeTD = document.createElement('td')
        const removeBtn = document.createElement('button')

        // nameTD.textContent = cookie
        nameTD.textContent = name
        // valueTD.textContent = cookies[cookie]
        valueTD.textContent = value
        // removeBtn.dataset.cookieName = cookie
        removeBtn.dataset.cookieName = name
        removeBtn.dataset.role = 'remove-cookie'
        removeBtn.textContent = 'Удалить'
        removeTD.append(removeBtn)
        tr.append(nameTD, valueTD, removeTD)
        fragment.append(tr)
        listTable.append(fragment)
    }
}

updateTable()