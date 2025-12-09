const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  
  tasks.forEach((task, index) => {
    taskList.innerHTML += `
      <div class="task-card">
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p><strong>Due:</strong> ${task.date}</p>
        <p>Status: <strong>${task.completed ? "Completed" : "Pending"}</strong></p>

        <button onclick="toggleTask(${index})">Mark Completed</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
  });
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;

  tasks.push({ title, description, date, completed: false });

  saveTasks();
  renderTasks();
  taskForm.reset();
});

renderTasks();
