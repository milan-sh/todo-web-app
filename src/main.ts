import './style.css';
import trash from "./assests/trash.svg";
import write from "./assests/write.svg";
import file from "./assests/file.svg";

type Todo = {
  id: number;
  task: string;
  isCompleted: boolean;
};

let taskList: Todo[] = JSON.parse(localStorage.getItem("taskList") || "[]");
let id = taskList.length ? Math.max(...taskList.map(t => t.id)) + 1 : 1;
let isEditingMode: boolean = false;
let editingId: number | null = null;
let totalTargets:number = 0;
let completedTasks:number = 0

const inputElement = document.getElementById("task") as HTMLInputElement;
const addToDoBtn = document.getElementById("add") as HTMLButtonElement;
const taskListElement = document.getElementById("taskList") as HTMLDivElement;

// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem("taskList", JSON.stringify(taskList));
}

// Function to render tasks
function renderTasks() {
  if (taskList.length > 0) {
    taskListElement.innerHTML = taskList
      .map(
        (item) =>
          `<div id="${item.id}" class="task bg-background grid grid-cols-8 gap-x-2 w-fit px-4 py-2 rounded-lg border border-border">
            <div class="flex justify-start items-center gap-x-4 col-span-6">
              <div class="checkbox-wrapper-26">
                <input type="checkbox" id="checkbox-${item.id}" ${item.isCompleted ? "checked" : ""}>
                <label for="checkbox-${item.id}">
                  <div class="tick_mark"></div>
                </label>
              </div>
              ${
                isEditingMode && editingId === item.id
                  ? `<input class="p-1 rounded-lg ring-1 ring-gray-400 outline-none text-white max-w-[45vw] text-lg" type="text" id="edit-${item.id}" value="${item.task}">`
                  : `<label class="text-xl lg:text-2xl font-semibold text-gray-300 text-wrap truncate ${item.isCompleted? "line-through" : ""}" for="checkbox-${item.id}">${item.task}</label>`
              }
            </div>
            <div class="flex justify-center items-center gap-x-4 ml-8 lg:ml-0">
              ${
                isEditingMode && editingId === item.id
                  ? `<button value="${item.id}" class="save cursor-pointer flex justify-center items-center invert-75">
                      <img class="min-w-[8vw] md:min-w-[5vw] lg:min-w-auto" src="${file}" alt="">
                    </button>`
                  : `<button value="${item.id}" class="update cursor-pointer flex justify-center items-center invert-75">
                      <img class="min-w-[8vw] md:min-w-[5vw] lg:min-w-auto" src="${write}" alt="">
                    </button>`
              }
              <button value="${item.id}" class="delete cursor-pointer flex justify-center items-center invert-75">
                <img class="min-w-[8vw] md:min-w-[5vw] lg:min-w-auto" src="${trash}" alt="">
              </button>
            </div>
          </div>`
      )
      .join("");
  } else {
    taskListElement.innerHTML = "<p class='text-gray-400 text-center'>No tasks available</p>";
  }
  updateGoal();
}



// Initial render
renderTasks();

//updating goal
function updateGoal(){
  totalTargets = taskList.length;
  completedTasks = taskList.filter(todo => todo.isCompleted).length;
  const goalElement = document.getElementById("goal") as HTMLHeadElement;
  goalElement.innerHTML = `<span>${completedTasks}</span>/<span>${totalTargets}</span>`
}


// Add new task
addToDoBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const title = inputElement.value.trim();
  if (!title) return;
  
  const newTask: Todo = { id: id++, task: title, isCompleted: false };
  taskList.push(newTask);
  saveTasks();
  renderTasks();
  inputElement.value = "";
});

// Event delegation for delete, update, and complete actions
taskListElement.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  if (target.closest(".delete")) {
    const button = target.closest(".delete") as HTMLButtonElement;
    deleteTodo(Number(button.value));
  }

  if (target.closest(".update")) {
    const button = target.closest(".update") as HTMLButtonElement;
    updateToDo(Number(button.value));
  }

  if (target.closest(".save")) {
    const button = target.closest(".save") as HTMLButtonElement;
    saveUpdatedTask(Number(button.value));
  }

  if (target.closest("input[type='checkbox']")) {
    const checkbox = target as HTMLInputElement;
    toggleCompletion(Number(checkbox.id.split("-")[1]));
  }
});

// Delete task
function deleteTodo(id: number) {
  taskList = taskList.filter((todo) => todo.id !== id);
  saveTasks();
  renderTasks();
  
}

// Enable edit mode
function updateToDo(id: number) {
  isEditingMode = true;
  editingId = id;
  renderTasks();
}

// Save updated task
function saveUpdatedTask(id: number) {
  const editInput = document.getElementById(`edit-${id}`) as HTMLInputElement;
  const updatedTitle = editInput.value.trim();
  if (!updatedTitle) return;

  const toDoToUpdate = taskList.find(todo => todo.id === id);
  if (toDoToUpdate) {
    toDoToUpdate.task = updatedTitle;
  }

  isEditingMode = false;
  editingId = null;
  saveTasks();
  renderTasks();
}

// Toggle completion status
function toggleCompletion(id: number) {
  const toDoToUpdate = taskList.find(todo => todo.id === id);

  if (toDoToUpdate) {
    toDoToUpdate.isCompleted = !toDoToUpdate.isCompleted;
  }

  completedTasks = taskList.filter(todo => todo.isCompleted).length;

  saveTasks();
  renderTasks();
}


