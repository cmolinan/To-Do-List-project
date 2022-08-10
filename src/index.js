import './style.css';

const info = {
  data: [{
    description: 'Play football',
    index: '1',
    completed: false,
  },
  {
    description: 'Go to the cinema',
    index: '2',
    completed: false,
  },
  {
    description: 'Finish the homework',
    index: '3',
    completed: false,
  },
  ],
};

const toDoList = info.data;
const displayToDo = () => {
  const ListElement = document.getElementById('detailedList');
  ListElement.innerHTML = '';

  toDoList.forEach((data) => {
    const todoLiElement = document.createElement('li');

    const todoCheckboxElement = document.createElement('input');
    todoCheckboxElement.classList.add('checkInput');
    todoCheckboxElement.setAttribute('type', 'checkbox');
    todoCheckboxElement.setAttribute('name', 'checkbox');
    todoCheckboxElement.setAttribute('value', data.index);

    if (data.completed) {
      todoCheckboxElement.checked = true;
    }

    const todoDescriptionElement = document.createElement('p');
    todoDescriptionElement.classList.add('label');
    todoDescriptionElement.innerText = data.description;

    todoLiElement.appendChild(todoCheckboxElement);
    todoLiElement.appendChild(todoDescriptionElement);
    ListElement.appendChild(todoLiElement);
  });
};

window.onload = () => {
  displayToDo();
};
