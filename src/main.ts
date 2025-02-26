import './style.css'

type Todo = {
    id:number
    task:string
    isCompleted:boolean
}

let taskList:Todo[] = [];
let id = 1;

// const goalElement = document.getElementById("goal") as HTMLDivElement;
const inputElement = document.getElementById("task") as HTMLInputElement
const addToDoBtn = document.getElementById("add") as HTMLButtonElement
const taskListElement = document.getElementById("taskList") as HTMLDivElement


taskList.push({id:id,task:"BreakFast", isCompleted:true})

//showing the tasks
renderTasks();

function renderTasks(){
    if(taskList.length>0){
        taskListElement.innerHTML = taskList.map((item)=>(
            `<div id=${item.id} class="task bg-background flex justify-between items-center gap-x-16 lg:gap-x-40 px-4 py-2 rounded-lg  border border-border">
                <div class="flex justify-center items-center gap-x-4">
                  <div class="checkbox-wrapper-26">
                    <input type="checkbox" id="_checkbox-26">
                    <label for="_checkbox-26">
                      <div class="tick_mark"></div>
                    </label>
                  </div>
                  <label for="_checkbox-26" class="text-xl lg:text-2xl font-semibold text-gray-300 text-wrap">${item.task}</label>
                </div>
                <div class="flex justify-center items-center gap-x-4">
                  <button class="cursor-pointer flex justify-center items-center invert-75"><img class="h-7 " src="./src/assests/write.svg" alt=""></button>
                  <button class="cursor-pointer flex justify-center items-center invert-75"><img class="h-7 " src="./src/assests/trash.svg" alt=""></button>
                </div>
              </div>`
        )).join("")
    }
}

//adding a task
const statusButtonElement = document.getElementById("_checkbox-26") as HTMLInputElement
addToDoBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    const title = inputElement.value.trim();
    if(!title) return;
    const newTask:Todo = {id:++id, task:title, isCompleted:statusButtonElement.checked}
    taskList.push(newTask)
    renderTasks();
    inputElement.value = ""
})

//