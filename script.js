const USERS_URL = 'https://jsonplaceholder.typicode.com',
    wrapper = document.querySelector('.wrapper');

getUsers()
function getUsers() {
    fetch(`${USERS_URL}/users`)
        .then(res => res.json())
        .then(data => {
        data.forEach(el => {
            const div = document.createElement('div');
            div.classList.add('users');
            div.setAttribute('id',el.id)
            div.innerHTML = `
            <h3>${el.name}</h3>
            <p>${el.email}</p>
            `
            div.onclick = onClickHandler;
            wrapper.prepend(div)
        });
        })
}
function onClickHandler(e) {
    getTodoList(e.currentTarget.id)
}
function getTodoList(id) {
    fetch(`${USERS_URL}/todos?userId=${id}`)
        .then(res => res.json())
        .then(data => {
            const toDoList = document.querySelector('.toDoList');
            if (toDoList === null) {
                wrapper.append(renderToDoList(data));
            } else {
            wrapper.removeChild(toDoList)
            wrapper.append(renderToDoList(data))
            }
    })
}
function renderToDoList(toDoList) {
    const div = document.createElement('div');
    const ol = document.createElement('ol');
            div.classList.add('toDoList');
            toDoList.forEach(el => {
                ol.innerHTML +=`<li>${el.title}</li>`
            })
    div.appendChild(ol)
    return div
}