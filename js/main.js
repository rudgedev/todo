window.onload = () => {
  const taskList = document.querySelector('.list__items');

  const todoList = localStorage.getItem('todoList');
  if(todoList)
    taskList.innerHTML = todoList;


  const taskButton = document.querySelector('.task__button');
  taskButton.onclick = () => {
    const inputText = document.querySelector('.task__input').value;
    addNewElem(inputText);

    document.querySelector('.task__input').value = '';
  };

  const addNewElem = (task) => {
    if(task === '') return;
    if(!checkTaskValue(task)) return;

    const newElem = document.createElement('li');
    newElem.className = 'list__item';
    newElem.innerHTML = `<p class="list__item-text">${task}</p>
      <button class="remove__item">Удалить</button>`;

    taskList.insertAdjacentElement('beforeend', newElem);

    localStorage.setItem('todoList', taskList.innerHTML);
  }

  taskList.onclick = (e) => {
    const elem = e.target;
    taskList.removeChild(elem.parentNode);

    localStorage.setItem('todoList', taskList.innerHTML);
  }

  const checkTaskValue = (value) => {
    const items = taskList.querySelectorAll('.list__item-text');
    for(let i = 0; i < items.length; i++) {
      if(items[i].textContent === value)
        return false;
    }

    return true;
  }

  setInterval(() => {
    var date = new Date()
    const options = {weekday : "long", month:"short", day:"numeric"};
    const dateTime = document.querySelector('.date__time');
    const dateDay = document.querySelector('.date__day');
    dateTime.innerHTML = dateFormat(date.getHours()) + ':' + dateFormat(date.getMinutes());
    dateDay.innerHTML = date.toLocaleDateString("en-US", options);
  }, 1000);

  const dateFormat = (value) => {
    return value < 10 ? '0' + value : value;
  }
};