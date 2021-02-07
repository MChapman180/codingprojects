let textBox = document.querySelector(".input-text");
let addButton = document.querySelector(".todo-button");
let list = document.querySelector(".todo-list");
let ul = document.querySelector(".todo-items");
let todos = document.querySelectorAll(".todo-item");
const counters = {
  butNum: 0,
  todoNum: 0
}

//create the todo list item and get the value from the textbox.
function createTodo(div) {
  const newTodo = document.createElement("li");
  newTodo.innerText = textBox.value;
  newTodo.classList.add("todo-item");
  newTodo.setAttribute("id", `todo${counters.todoNum += 1}`);
  div.appendChild(newTodo);
}
// create the completed button 
function createCompleteBut(div) {
  const completedBut = document.createElement("button");
  completedBut.classList.add("complete-btn");
  completedBut.setAttribute("id", `button${counters.butNum += 1}`);
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

ul.addEventListener('click', function(event) {
  if(event.target.tagName === 'BUTTON')  {
    //slice the id from the button and add to the todo id to change the colour
    document.getElementById(`todo${event.target.id.slice(-1)}`).classList.toggle('checked'); 
  }
});







