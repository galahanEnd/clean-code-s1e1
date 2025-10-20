const taskInput = document.getElementById("new-task");
const addButton = document.querySelector(".button");
const incompleteTaskHolder = document.getElementById("incompleteTasks");
const completedTasksHolder = document.getElementById("completed-tasks");

function createNewTaskElement(taskString) {
  const listItem = document.createElement("li");

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";

  const label = document.createElement("label");
  label.className = "task";
  label.innerText = taskString;

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "task";

  const editButton = document.createElement("button");
  editButton.className = "edit";
  editButton.innerText = "Edit";

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  const deleteImg = document.createElement("img");
  deleteImg.src = "./remove.svg";
  deleteImg.alt = "remove-btn";
  deleteButton.appendChild(deleteImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  bindTaskEvents(listItem, taskCompleted);

  return listItem;
}

function addTask(e) {
  e.preventDefault();
  if (!taskInput.value.trim()) return;
  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  taskInput.value = "";
}

function editTask() {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit');

  if (listItem.classList.contains('editMode')) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }
  listItem.classList.toggle('editMode');
}

function deleteTask() {
  const listItem = this.parentNode;
  listItem.parentNode.removeChild(listItem);
}

function taskCompleted() {
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  taskListItem.querySelector('.edit').onclick = editTask;
  taskListItem.querySelector('.delete').onclick = deleteTask;
  taskListItem.querySelector('input[type=checkbox]').onchange = checkBoxEventHandler;
}

Array.from(incompleteTaskHolder.children).forEach(li => bindTaskEvents(li, taskCompleted));
Array.from(completedTasksHolder.children).forEach(li => bindTaskEvents(li, taskIncomplete));

addButton.addEventListener('click', addTask);