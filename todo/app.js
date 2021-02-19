// New features todo:
// 1. Add edit feature inside a todo list. When an edit button is pressed, one can mess with innerHtml.
// 2. Whenever a todo item is created, somehow show at which time it is created.It should show "Created at 12/12/2021 at 6:16 am UTC" <example>
// -X-

let todoDiv = document.querySelector("#todo-div");
let inputText = document.querySelector("#input-text");
let addBtn = document.querySelector("#addBtn");
let modalYes = document.querySelector(".yes");

let counter = {
  todos: 0,
  completeButtons: 0,
  editButtons: 0,
};

// take the input from the text input box
addBtn.addEventListener("click", function () {
  if (inputText.value.length > 0) {
    createTodo(inputText.value);
    inputText.value = "";
  }
});

//if the add button is pressed, add the text from the input to a list item in the todo div
function createTodo(text) {
  counter.todos += 1;
  counter.completeButtons += 1;
  counter.editButtons += 1;
  todoDiv.innerHTML += `<div class="input-group mb-3">
  <input type="text" class="form-control" id="todo${counter.todos}" value="${text}" readonly>
  <div class="input-group-append completeBtns">
  <button type="button" class="btn btn-success completeBtn" data-toggle="modal" data-target="#completeModal" id="btn${counter.completeButtons}">Complete</button>
  </div>
  <div class="input-group-append editBtns">
  <button type="button" class="btn btn-info" id="edit${counter.editButtons}">edit</button>
  </div>
</div>
</div>`;
}


const todoContainer = document.querySelector("#todo-div");
// if user clicks on the todo container, check if a button is clicked, and then add the modal if click is on complete, or edit otherwise.
todoContainer.onclick = function (event) {
    event.preventDefault();
    const element = event.target;
    if (element.nodeName === 'BUTTON') {
      if(element.id.includes('btn')) {
        addModal(element, event)
      } else {
        if(element.id.includes('edit')) {
          document.getElementById(`btn${String(element.id.match(/\d/g) || [])}`).disabled = false;
          document.getElementById(`btn${String(element.id.match(/\d/g) || [])}`).classList.remove('btn-secondary');
          document.getElementById(`btn${String(element.id.match(/\d/g) || [])}`).classList.add('btn-success');
          document.getElementById(`btn${String(element.id.match(/\d/g) || [])}`).innerHTML = 'Complete';
        editTodo(element, event);
        } 
    } 
    }
}

// add the colour to the todo list when the complete button is pressed
function addModal(element, event) {
  
  modalYes.addEventListener('click', () => {
    document.getElementById(event.target.id).classList.remove('btn-success');
    document.getElementById(event.target.id).classList.add('btn-secondary');
    element.innerHTML = `Completed at ${new Date()}`;
    document.getElementById(event.target.id).disabled = true;
    let todoTextBox = retrieveTodo(element);
    document.getElementById(todoTextBox.id).style.backgroundColor = "#ffd7d7";
    document.getElementById(todoTextBox.id).setAttribute('readonly', true);
})
}
// edit the todo when the edit button is pressed and change the innerHTML
function editTodo(element, event) {
  let todoText = retrieveTodo(element);
  document.getElementById(todoText.id).style.backgroundColor = "white";
  document.getElementById(todoText.id).setAttribute('readonly', false);
  }

function retrieveTodo(ele) {
  return document.getElementById(`todo${String(ele.id.match(/\d/g) || [])}`);
}


//attempt 2
// // I couldn't work out how to use Bootstrap to 'strikethrough' the text when clicking the checkbox.
// // I couldn't get the alignment of the buttons quite right too

// let addButton = document.querySelector(".btn-primary");
// let textInput = document.querySelector("#input-text");
// let todoDiv = document.querySelector("#todo");
// let deleteButtons = document.querySelector('.btn-outline-success')
// let counters = {
//   todos: 0,
//   buttons: 0
// }

// addButton.addEventListener('click', function(event) {
//   event.preventDefault();
//   let text = textInput.value;
//   createTodo(text);
//   textInput.value = '';
// })

// function createTodo(todo) {
//     if (textInput.value.length > 0) {
//       counters.todos += 1;
//       counters.buttons += 1;
//       let input = `<input class="form-check-input" type="checkbox" value="" id="todo-item${counters.todos}">${todo}`;
//       let button = `<button type="button" class="btn btn-outline-success btn-small" id="button${counters.buttons}">X</button>`;
//       let label = `<label class="form-check-input" for="todo-item${counters.todos}"></label>`;
//       todoDiv.innerHTML += `${input}${label}${button}<br>`;
//     }
// }

// todoDiv.addEventListener('click', function(event) {
//   if(event.target.tagName === 'BUTTON') {
//     document.querySelector(`#todo-item${event.target.id.slice(-1)}`).classList = 'checked';
//   };
// })

// todoDiv.addEventListener('click', function(event) {
//   if(event.target.tagName === 'BUTTON') {
//     document.querySelector(`#todo-item${event.target.id.slice(-1)}`).style.color = 'red';
//   };
// })

//------------------------------------- attempt 1
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
