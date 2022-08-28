//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector('.filter-todo');
//Function events
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
//Functions

function addTodo(event){
    event.preventDefault();
    const todoDIV = document.createElement('div');
    todoDIV.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDIV.appendChild(newTodo);
    //Add toLocalStorage
    saveToLocalStorage(todoInput.value);
    //Check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<li class="fas fa-check"></li>';
    completedButton.classList.add("complete-button");
    todoDIV.appendChild(completedButton);
//Delete button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<li class="fas fa-trash"></li>';
    trashButton.classList.add("trash-button");
    todoDIV.appendChild(trashButton);

    todoList.appendChild(todoDIV);
    //Clear todoInput value
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;
     if(item.classList[0] === 'trash-button'){
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
     }
     //Check
     if(item.classList[0] === "complete-button"){
         const todo = item.parentElement;
         todo.classList.toggle("completed");
     }
}


function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
                case "completed":
                    if(todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                    }else{
                        todo.style.display = 'none';
                    }
                    break;
                case "uncompleted": 
                    if(!todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                    }else{
                        todo.style.display = 'none';
                    }
                    break;
                
        }
    });
}



function saveToLocalStorage(todo){
    let todos
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
  
function getTodos(){
    let todos
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDIV = document.createElement('div');
        todoDIV.classList.add('todo');
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDIV.appendChild(newTodo);
        //Check button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<li class="fas fa-check"></li>';
        completedButton.classList.add("complete-button");
        todoDIV.appendChild(completedButton);
    //Delete button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<li class="fas fa-trash"></li>';
        trashButton.classList.add("trash-button");
        todoDIV.appendChild(trashButton);

        todoList.appendChild(todoDIV);
        });
}

function removeLocalStorage(todo){
    
}