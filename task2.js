const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const clearAllBtn = document.getElementById("clearAll");
const clearCompletedBtn = document.getElementById("clearCompleted");
const list = document.getElementById("taskList");
const counts = document.getElementById("counts");


let tasks = JSON.parse(localStorage.getItem("todo_tasks")) || [];


// Save to local storage
function save(){
localStorage.setItem("todo_tasks", JSON.stringify(tasks));
}


// Update UI
function render(){
list.innerHTML = "";


tasks.forEach(task => {
const li = document.createElement("li");
li.className = "task-item";
li.setAttribute("data-id", task.id);
li.innerHTML = `
<span class="task-text ${task.done ? "completed" : ""}">${task.text}</span>
<div class="task-buttons">
<button class="toggle">✔</button>
<button class="edit">✎</button>
<button class="delete">🗑</button>
</div>`;


list.appendChild(li);
});


const completed = tasks.filter(t => t.done).length;
counts.textContent = `${completed} completed / ${tasks.length} total`;
save();
}


// Add task
function addTask(){
const text = taskInput.value.trim();
if(!text) return;


tasks.push({ id: Date.now(), text, done: false });
taskInput.value = "";
render();
}


addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", e => { if(e.key === "Enter") addTask(); });


// Task actions (Edit, Delete, Toggle)
list.addEventListener("click", e => {
const li = e.target.closest("li");
if(!li) return;
const id = Number(li.getAttribute("data-id"));
const task = tasks.find(t => t.id === id);


if(e.target.classList.contains("toggle")){
task.done = !task.done;
render();
}


if(e.target.classList.contains("delete")){
tasks = tasks.filter(t => t.id !== id);
render();
}


if(e.target.classList.contains("edit")){
let newText = prompt("Edit task", task.text);
if(newText !== null && newText.trim() !== ""){
task.text = newText.trim();
render();
}
}
});


// Clear completed
clearCompletedBtn.addEventListener("click", () => {
tasks = tasks.filter(t => !t.done);
render();
});


// Clear all
clearAllBtn.addEventListener("click", () => {
if(confirm("Are you sure you want to delete all tasks?")){
tasks = [];
render();
}
});


render();