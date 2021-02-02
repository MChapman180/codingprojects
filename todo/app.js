let textBox = document.querySelector(".input-text");
let addButton = document.querySelector(".todo-button");
let list = document.querySelector(".todo-list");
let ul = document.querySelector(".todo-items");
let completedArr = [];

//create the todo list item and get the value from the textbox.
function createTodo(div) {
  const newTodo = document.createElement("li");
  newTodo.innerText = textBox.value;
  newTodo.classList.add("todo-item");
  div.appendChild(newTodo);
}
// create the completed button 
function createCompleteBut(div) {
  const completedBut = document.createElement("button");
  completedBut.classList.add("complete-btn")
  completedBut.textContent = 'complete';
  div.appendChild(completedBut);
}

// when the add button is clicked, get the value out of textBox 
addButton.addEventListener('click', function(event) {
  event.preventDefault();
  if (textBox.value.length > 0) {
    const div = document.createElement("div");
    div.classList.add("todo");
    createTodo(div);
    createCompleteBut(div);
    ul.appendChild(div);
    textBox.value = '';
    }
})






