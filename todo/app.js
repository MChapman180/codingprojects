// New features todo:
// 1. Add edit feature inside a todo list. When an edit button is pressed, one can mess with innerHtml.
// 2. Whenever a todo item is created, somehow show at which time it is created.It should show "Created at 12/12/2021 at 6:16 am UTC" <example>
// -X-

// show the date and time of updation
// read about CRUD
// create an invisible badge
// change its visibility if edit is pressed at least once
// can make elements invisible by writing invisible in the class


let todoDiv = document.querySelector("#todo-div");
let inputText = document.querySelector("#input-text");
let addBtn = document.querySelector("#addBtn");
let modalYes = document.querySelector(".yes");
let editButtonPressed = false;

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
editButtonPressed = false;
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
            editButtonPressed = true;
            completeTodo(element)
            editTodo(element);
          } 
       } 
    }
}

// add the colour to the todo list when the complete button is pressed
function addModal(element, event) {
  let editDate = retrieveTodo(element, 'editDate');
  let date = createDate();
  modalYes.addEventListener('click', () => {
    event.preventDefault(); 
    editButtons(event, element);
    if (!editButtonPressed) {
      createTimeBadge(element);
  } else {
    if(editDate) {
      editDate.classList.remove('invisible'); 
      editDate.textContent = `Edited ${date}`
  } 
}
})
}
//edit the todo buttons so that the background goes read and they are read only 
function editButtons(event, element) {
  document.getElementById(event.target.id).classList.remove('btn-success');
  document.getElementById(event.target.id).classList.add('btn-secondary');
  document.getElementById(event.target.id).disabled = true;
  let todoTextBox = retrieveTodo(element, 'todo');
  document.getElementById(todoTextBox.id).style.backgroundColor = "#ffd7d7";
  document.getElementById(todoTextBox.id).setAttribute('readonly', true);
}

function completeTodo(element) {
  retrieveTodo(element, 'btn').classList.remove('btn-secondary');
  retrieveTodo(element, 'btn').classList.add('btn-success');
  retrieveTodo(element, 'btn').innerHTML = 'Complete';
  retrieveTodo(element, 'btn').disabled = false;
}
// edit the todo when the edit button is pressed and change the innerHTML
function editTodo(element) {
  let todoText = retrieveTodo(element, 'todo');
  document.getElementById(todoText.id).style.backgroundColor = "white";
  document.getElementById(todoText.id).readOnly = false;
} 

function retrieveTodo(ele, id) {
  return document.getElementById(`${id}${String(ele.id.match(/\d/g) || [])}`);
}
//create the badge with the date
function createTimeBadge(element) {
  let date = createDate();
  let div = retrieveTodo(element, 'div');
  if (!String(div.innerHTML).includes(`Created`)) {
    div.innerHTML += `<div class="input-group mb-3" id="badge${counter.todos}"> <span class="badge bg-secondary mr-1">Created ${date}</span> 
    <span class="badge bg-secondary invisible ml-1" id="editDate${counter.todos}">Edited ${date}</span> </div>`;
  } 
}

function createDate() {
  let d = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, 0)}`; 
}


