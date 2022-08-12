let toDoList = [];
let isEditing = false;
let todoEdit = null;

const desc = document.getElementById('addToDo');

const saveData = () => {
  localStorage.setItem('listToDo', JSON.stringify(toDoList));
};

const getData = () => {
  const localFormData = JSON.parse(localStorage.getItem('listToDo'));
  if (localFormData == null) {
    toDoList = [];
  } else {
    toDoList = localFormData;
  }
};

const editList = (todo) => {
  isEditing = true;
  todoEdit = todo;
  const desc = document.getElementById('addToDo');
  desc.value = todo.description;
  desc.focus();
};

// MAIN OBJECT
const displayToDo = () => {
  const itemsList = document.getElementById('detailedList');
  itemsList.innerHTML = '';

  // remove a To Do item
  const removeList = (indexID) => {
    toDoList = toDoList.filter((ind) => ind.index !== indexID);
    toDoList = toDoList.map((todo, index) => ({
      description: todo.description,
      completed: todo.completed,
      index: index + 1,
    }));
    isEditing = false;
    desc.value = null;
    displayToDo();
  };

  const toggleToDoStatus = (todo) => {
    for (let i = 0; i < toDoList.length; i += 1) {
      if (toDoList[i].index === todo.index) {
        toDoList[i].completed = !todo.completed;
        break;
      }
    }
    saveData();
  };

  // Dynamic generation of the To-Do List
  toDoList.forEach((data) => {
    const todoLiElement = document.createElement('li');
    todoLiElement.setAttribute('draggable', true);
    todoLiElement.classList.add('item');
    const todoCheckboxElement = document.createElement('input');
    todoCheckboxElement.classList.add('checkInput');
    todoCheckboxElement.setAttribute('type', 'checkbox');
    todoCheckboxElement.setAttribute('name', 'checkbox');
    todoCheckboxElement.setAttribute('value', data.index);

    const todoDescriptionElement = document.createElement('p');
    todoDescriptionElement.classList.add('label');
    todoDescriptionElement.innerText = data.description;

    const actionBtns = document.createElement('div');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('hide');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.innerHTML = '<i class="fa fa-lg fa-trash">';

    const pointsBtn = document.createElement('button');
    pointsBtn.classList.add('more-btn');
    pointsBtn.setAttribute('type', 'button');
    pointsBtn.innerHTML = '<i class="fa fa-ellipsis-v pointsBtn"></i>';

    todoLiElement.appendChild(todoCheckboxElement);
    todoLiElement.appendChild(todoDescriptionElement);

    // actionBtns.appendChild(editBtn);
    actionBtns.appendChild(deleteBtn);
    actionBtns.appendChild(pointsBtn);

    todoLiElement.appendChild(actionBtns);
    itemsList.appendChild(todoLiElement);

    const actions = () => {
      const desc = document.getElementById('addToDo');
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

    if (data.completed) {
      todoCheckboxElement.checked = true;
      todoDescriptionElement.classList.add('changeChk');
    }

    // MENU LISTENERS

    // Listener for Delete btn
    todoCheckboxElement.addEventListener('change', () => {
      if (todoCheckboxElement.checked) {
        todoDescriptionElement.classList.add('changeChk');
      } else todoDescriptionElement.classList.remove('changeChk');
      toggleToDoStatus(data);
    });

    // Listener for Points Menu
    pointsBtn.addEventListener('click', () => {
      actions();
    });

    // Listener for input - delete Item
    deleteBtn.addEventListener('click', () => {
      removeList(data.index);
    });

    // Listener double click on Item
    todoDescriptionElement.addEventListener('dblclick', () => {
      actions();
    });
  });

  saveData();
};
// End of Main Object

// Add New "To Do" item
const addToDo = () => {
  const desc = document.getElementById('addToDo');
  if (desc.value) {
    const completed = false;
    const description = desc.value;
    const index = toDoList.length + 1;
    toDoList.push({ completed, description, index });
    displayToDo();
    saveData();
    desc.value = null;
  }
  toDoList = toDoList.map((todo, index) => ({
    completed: todo.completed,
    description: todo.description,
    index: index + 1,
  }));
};

// Save the new "To Do" item
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
    saveData();
    desc.value = null;
    isEditing = false;
    todoEdit = null;
  }
};

// Function: read variable isEditing
const getIsEditing = () => isEditing;

// remove and save Completed items. Then display List
const clearAllCompleted = () => {
  toDoList = toDoList.filter((todo) => !todo.completed);
  toDoList = toDoList.map(
    (todo, index) => (
      { completed: todo.completed, description: todo.description, index: index + 1 }
    ),
  );
  isEditing = false;
  desc.value = null;
  saveData();
  displayToDo();
};

export {
  getData, clearAllCompleted, addToDo, saveEdit, displayToDo, getIsEditing,
};
