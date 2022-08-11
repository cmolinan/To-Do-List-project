import './style.css';

const desc = document.getElementById('addToDo');

let toDoList = [];
let isEditing = false;
let todoEdit = null;

const editList = (todo) => {
  isEditing = true;
  todoEdit = todo;
  desc.value = todo.description;
  desc.focus();
};

// Main Object
const displayToDo = () => {
  const itemsList = document.getElementById('detailedList');
  itemsList.innerHTML = '';

  // remove a To Do item
  const removeList = (indexID) => {
    desc.value = null;
    isEditing = false;

    toDoList = toDoList.filter((ind) => ind.index !== indexID);
    toDoList = toDoList.map((todo, index) => ({
      description: todo.description,
      completed: todo.completed,
      index: index + 1,
    }));
    displayToDo();
  };

  // Dynamic generation of the To Do List
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

    const actionBtns = document.createElement('div');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('hide');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.innerHTML = '<i class=" fa fa-lg fa-trash icon">';

    const pointsBtn = document.createElement('button');
    pointsBtn.classList.add('more-btn');
    pointsBtn.setAttribute('type', 'button');
    pointsBtn.innerHTML = '<i class="fa fa-ellipsis-v"></i>';

    todoLiElement.appendChild(todoCheckboxElement);
    todoLiElement.appendChild(todoDescriptionElement);

    actionBtns.appendChild(deleteBtn);
    actionBtns.appendChild(pointsBtn);

    todoLiElement.appendChild(actionBtns);

    itemsList.appendChild(todoLiElement);

    // MENU LISTENERS

    // Listener for Delete btn
    deleteBtn.addEventListener('click', () => {
      removeList(data.index);
    });

    const actions = () => {
      if (!isEditing) {
        deleteBtn.classList.toggle('hide');
        desc.value = null;
        isEditing = false;
        editList(data);
        pointsBtn.classList.toggle('hide');
      } else {
        displayToDo();
        desc.value = null;
        isEditing = false;
      }
    };

    // Listener for menu points
    pointsBtn.addEventListener('click', () => {
      actions();
    });

    // Listener for input - edit Item
    todoDescriptionElement.addEventListener('dblclick', () => {
      actions();
    });
  });
};
// End of Main Object

// Add New To Do item
const addToDo = () => {
  const desc = document.getElementById('addToDo');
  if (desc.value) {
    const completed = false;
    const description = desc.value;
    const index = toDoList.length + 1;
    toDoList.push({ completed, description, index });
    displayToDo();
    desc.value = null;
  }
  toDoList = toDoList.map((todo, index) => ({
    completed: todo.completed,
    description: todo.description,
    index: index + 1,
  }));
};

// Save the new Todo item
const saveEdit = () => {
  const desc = document.getElementById('addToDo');
  if (desc.value) {
    toDoList = toDoList.map((todo) => {
      if (todo.index === todoEdit.index) {
        return { ...todo, description: desc.value };
      }
      return todo;
    });
    displayToDo();
    desc.value = null;
    isEditing = false;
    todoEdit = null;
  }
};

// Read variable isEditing
const getIsEditing = () => isEditing;

window.onload = () => {
  displayToDo();
};

desc.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    if (!getIsEditing()) addToDo();
    else saveEdit();
  }
});
