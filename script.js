const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function saveTasks() {
  localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    taskList.innerHTML = savedTasks;
  }
}

// load tasks when page opens
loadTasks();

// ONE listener for all clicks inside taskList (event delegation)
taskList.addEventListener("click", function (e) {
  // click on the task text
  if (e.target.tagName === "SPAN") {
    e.target.parentElement.classList.toggle("completed");
    saveTasks();
  }

  // click on Delete button
  if (e.target.tagName === "BUTTON") {
    e.target.parentElement.remove();
    saveTasks();
  }
});

addTaskBtn.addEventListener("click", function () {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  const li = document.createElement("li");

  const textSpan = document.createElement("span");
  textSpan.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.marginLeft = "12px";

  li.appendChild(textSpan);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
  taskInput.value = "";

  // SAVE after adding
  saveTasks();
});
