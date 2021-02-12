// I couldn't work out how to use Bootstrap to 'strikethrough' the text when clicking the checkbox.
// I couldn't get the alignment of the buttons quite right too

let addButton = document.querySelector(".btn-primary");
let textInput = document.querySelector("#input-text");
let todoDiv = document.querySelector("#todo");
let deleteButtons = document.querySelector('.btn-outline-success')
let counters = {
  todos: 0,
  buttons: 0
}

addButton.addEventListener('click', function(event) {
  event.preventDefault();
  let text = textInput.value;
  createTodo(text);
  textInput.value = '';
})

function createTodo(todo) {
    if (textInput.value.length > 0) {
      counters.todos += 1;
      counters.buttons += 1;
      let input = `<input class="form-check-input" type="checkbox" value="" id="todo-item${counters.todos}">${todo}`;
      let button = `<button type="button" class="btn btn-outline-success btn-small" id="button${counters.buttons}">X</button>`;
      let label = `<label class="form-check-input" for="todo-item${counters.todos}"></label>`;
      todoDiv.innerHTML += `${input}${label}${button}<br>`;
    }
}

todoDiv.addEventListener('click', function(event) {
  if(event.target.tagName === 'BUTTON') {
    document.querySelector(`#todo-item${event.target.id.slice(-1)}`).classList = 'checked';
  };
})


todoDiv.addEventListener('click', function(event) {
  if(event.target.tagName === 'BUTTON') {
    document.querySelector(`#todo-item${event.target.id.slice(-1)}`).style.color = 'red';
  };
})



// let textBox = document.querySelector(".add-todo");
// let addButton = document.querySelector(".btn");
// let list = document.querySelector(".todo-list");
// let ul = document.querySelector(".list-unstyled");
// let todos = document.querySelectorAll(".list-group-item");
// const counters = {
//   butNum: 0,
//   todoNum: 0
// }

// //create the todo list item and get the value from the textbox.
// function createTodo(div) {
//   const newTodo = document.createElement("li");
//   newTodo.innerText = textBox.value;
//   newTodo.classList.add("list-group-item");
//   newTodo.setAttribute("id", `todo${counters.todoNum += 1}`);
//   div.appendChild(newTodo);
// }
// // create the completed button 
// function createCompleteBut(div) {
//   const completedBut = document.createElement("button");
//   completedBut.classList.add("btn");
//   completedBut.classList.add("btn-success");
//   completedBut.setAttribute("id", `button${counters.butNum += 1}`);
//   completedBut.textContent = 'complete';
//   div.appendChild(completedBut);
// }

// // when the add button is clicked, get the value out of textBox 
// addButton.addEventListener('click', function(event) {
//   event.preventDefault();
//   if (textBox.value.length > 0) {
//     const div = document.createElement("div");
//     div.classList.add("todo");
//     createTodo(div);
//     createCompleteBut(div);
//     ul.appendChild(div);
//     textBox.value = '';
//     }
// })

// ul.addEventListener('click', function(event) {
//   if(event.target.tagName === 'BUTTON')  {
//     //slice the id from the button and add to the todo id to change the colour
//     document.getElementById(`todo${event.target.id.slice(-1)}`).classList.toggle('checked'); 
//   }
// });







