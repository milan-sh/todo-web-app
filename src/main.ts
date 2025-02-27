import './style.css'
import trash from "./assests/trash.svg"
import write from "./assests/write.svg"

type Todo = {
  id: number;
  task: string;
  isCompleted: boolean;
};

let taskList: Todo[] = [];
let id = 1;

const inputElement = document.getElementById("task") as HTMLInputElement;
const addToDoBtn = document.getElementById("add") as HTMLButtonElement;
const taskListElement = document.getElementById("taskList") as HTMLDivElement;

// Function to render tasks
function renderTasks() {
  if (taskList.length > 0) {
    taskListElement.innerHTML = taskList
      .map(
        (item) =>
          `<div id=${item.id} class="task bg-background flex justify-between items-center gap-x-16 lg:gap-x-40 px-4 py-2 rounded-lg border border-border">
            <div class="flex justify-center items-center gap-x-4">
              <div class="checkbox-wrapper-26">
                <input type="checkbox" id="checkbox-${item.id}" ${item.isCompleted ? "checked" : ""}>
                <label for="checkbox-${item.id}">
                  <div class="tick_mark"></div>
                </label>
              </div>
              <label for="checkbox-${item.id}" class="text-xl lg:text-2xl font-semibold text-gray-300 text-wrap">${item.task}</label>
            </div>
            <div class="flex justify-center items-center gap-x-4">
              <button value=${item.id} class="update cursor-pointer flex justify-center items-center invert-75">
                <img class="h-7" src=${write} alt="">
              </button>
              <button value=${item.id} class="delete cursor-pointer flex justify-center items-center invert-75">
                <img class="h-7" src=${trash} alt="">
              </button>
            </div>
          </div>`
      )
      .join("");
  } else {
    taskListElement.innerHTML = "<p class='text-gray-400 text-center'>No tasks available</p>";
  }
}

// Show initial tasks
renderTasks();

// Add new task
addToDoBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const title = inputElement.value.trim();
  if (!title) return;
  const newTask: Todo = { id: id++, task: title, isCompleted: false };
  taskList.push(newTask);
  renderTasks();
  inputElement.value = "";
});

// Delete task using event delegation
taskListElement.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.closest(".delete")) {
    const button = target.closest(".delete") as HTMLButtonElement;
    deleteTodo(Number(button.value));
  }
});

function deleteTodo(id: number) {
  taskList = taskList.filter((todo) => todo.id !== id);
  renderTasks();
}

//updating task

