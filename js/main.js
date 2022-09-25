// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue

// Funções
const saveTodo = (text) => {

    // card de tarefa
    const todo = document.createElement("div")
    todo.classList.add("todo")

    // tittle
    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text
    todo.appendChild(todoTitle)

    // button finalizar
    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    // button editar
    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    // button deletar
    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo)

    todoInput.value = ""
    todoInput.focus()
}

const toggleFomrs = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

const updateTodo = (text) => {

    const todos =  document.querySelectorAll(".todo")

    todos.forEach((todo) => {

        let todoTitle = todo.querySelector("h3")

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text
        }
    })
}   

// Eventos
todoForm.addEventListener("submit", (e) => {

    e.preventDefault()

    const inputValue = todoInput.value

    if(inputValue) {
        saveTodo(inputValue)
    }
})


document.addEventListener("click", (e) => {
    const targetEl = e.target
    const parentEl = targetEl.closest("div")
    let todoTitle

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText
    }

    // class de concluido
    if(targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done")
    }

    // deletar
    if(targetEl.classList.contains("remove-todo")) {
        parentEl.remove()
    }

    // editar
    if(targetEl.classList.contains("edit-todo")) {
        toggleFomrs()

        editInput.value = todoTitle
        oldInputValue = todoTitle
    }

})

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault()

    toggleFomrs()
})

// btn para editar titulo da tarefa
editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const editInputValue = editInput.value

    if(editInputValue) {
        updateTodo(editInputValue)

        toggleFomrs()
    }
})