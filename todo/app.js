// New features todo:
// 1. Add edit feature inside a todo list. When an edit button is pressed, one can mess with innerHtml.
// 2. Whenever a todo item is created, somehow show at which time it is created.It should show "Created at 12/12/2021 at 6:16 am UTC" <example>
// -X-

let todoDiv = document.querySelector("#todo-div");
let inputText = document.querySelector("#input-text");
let addBtn = document.querySelector("#addBtn");
let modalYes = document.querySelector(".yes");
let currentTodo;

let counter = {
  todos: 0,
  completeButtons: 0,
  editButtons: 0,
  div: 0,
  badge: 0
};

// take the input from the text input box
addBtn.addEventListener("click", function () {
  if (inputText.value.length > 0) {
    createTodo(inputText.value);
    inputText.value = "";
  }
});

function updateCounters() {
  counter.todos += 1;
  counter.completeButtons += 1;
  counter.editButtons += 1;
  counter.div += 1;
}

//if the add button is pressed, add the text from the input to a list item in the todo div
function createTodo(text) {
  updateCounters();
  todoDiv.innerHTML += `<div class="input-group mb-3" id="div${counter.div}">
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
      if (element.id.includes('btn')) {
        addModal(element, event)
      } else {
          if(element.id.includes('edit')) {
            document.getElementById(`btn${String(element.id.match(/\d/g) || [])}`).disabled = false;
            document.getElementById(`btn${String(element.id.match(/\d/g) || [])}`).classList.remove('btn-secondary');
            document.getElementById(`btn${String(element.id.match(/\d/g) || [])}`).classList.add('btn-success');
            document.getElementById(`btn${String(element.id.match(/\d/g) || [])}`).innerHTML = 'Complete';
            currentTodo = retrieveTodo(element, 'todo').value
            editTodo(element, event);
          } 
       } 
    }
}

// add the colour to the todo list when the complete button is pressed
function addModal(element, event) {
  
  modalYes.addEventListener('click', () => {
    event.preventDefault(); 
    document.getElementById(event.target.id).classList.remove('btn-success');
    document.getElementById(event.target.id).classList.add('btn-secondary');
    document.getElementById(event.target.id).disabled = true;
    let todoTextBox = retrieveTodo(element, 'todo');
    document.getElementById(todoTextBox.id).style.backgroundColor = "#ffd7d7";
    document.getElementById(todoTextBox.id).setAttribute('readonly', true);
    createTimeBadge(element, event);
  })
}
// edit the todo when the edit button is pressed and change the innerHTML
function editTodo(element, event) {
  let todoText = retrieveTodo(element, 'todo');
  document.getElementById(todoText.id).style.backgroundColor = "white";
  document.getElementById(todoText.id).readOnly = false;
} 

function retrieveTodo(ele, id) {
  return document.getElementById(`${id}${String(ele.id.match(/\d/g) || [])}`);
}

function createTimeBadge(element, event) {
  let date = createDate();
  let div = retrieveTodo(element, 'div');
  let todo = retrieveTodo(element, 'todo');
  let badge = retrieveTodo(element, 'badge');
  // If there is not already a badge, create a new one
  if (!String(div.innerHTML).includes('badge')) {
    div.innerHTML += `<div class="input-group mb-3" id="badge${counter.todos}"> <span class="badge bg-secondary">Created ${date}</span> </div>`;
    // else if there is not already an edit badge, and the current div has the correct badge id of the current target
} else {
  editBadge(element, div, date, badge);
}
}

function editBadge(element, div, date, badge) {
if (!String(div.innerHTML).includes('editBadge') && String(div.innerHTML).includes(`${retrieveTodo(element, 'badge')}`)) {
  //if there is a value in the current todo, and the value is not equal to the value before editing
if (todo.value.length > 0 && todo.value != currentTodo) {
// add the editbadge below the createdbadge
div.innerHTML += `<div class="input-group mb-3" id="editBadge${counter.todos}"> <span class="badge bg-secondary" id="badge${counter.todos}">Edited ${date}</span> </div>`;
}
}
//if the badge has already been edited, then rather than adding a new edit badge, just edit the current one with the new date/time
else {
if(String(div.innerHTML).includes(`${retrieveTodo(element, 'badge')}`)) {
badge.value = `Edited ${date}`;
}
}
}

function createDate() {
  let d = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`; 
}
