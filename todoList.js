let todoList = [];
  /* JSON.parse(localStorage.getItem("todoList")); */ /* || [
  {
    name: "Learn Javascript",
    dueDate: "02.08.2023",
  },
  {
    name: "Learn Vuejs",
    dueDate: "21.09.2023",
  },
]; */

renderTodoList();

//saving to local storage
/* function saveToLocalStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
} */

//add button
const addButton = document.querySelector(".js-add-button");
addButton.addEventListener("click", addToList);

//input for todo
const todoInput = document.querySelector(".js-todo-input");
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addToList();
  }
});

//date input
const dateInput = document.querySelector(".js-date-input");
dateInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addToList();
  }
});

function dayMonthYearFormat(dueDate) {
  const splittedDate = dueDate.split("-");
  const day = splittedDate[2];
  const month = splittedDate[1];
  const year = splittedDate[0];
  dueDate = `${day}.${month}.${year}`;
  if (dueDate === "undefined.undefined.") {
    dueDate = "";
  }
  return dueDate;
}

function addToList() {
  let todoInput = document.querySelector(".js-todo-input");
  let dueDateInput = document.querySelector(".js-date-input");
  const name = todoInput.value;
  let dueDate = dueDateInput.value;

  if (name) {
    todoList.push({
      name: name,
      dueDate: dayMonthYearFormat(dueDate),
    });
    todoInput.value = "";
    dueDateInput.value = "";
    renderTodoList();
  } else {
    alert("Enter what to do with a due date");
    dueDateInput.value = "";
  }
}

function renderTodoList() {
  let todoHTML = "";
  todoList.forEach((todo) => {
    const { name, dueDate } = todo;
    const html = `
    <div class="todo-container">
      <div class="todo-text js-todo-text">${name}</div>
      <div class="due-date js-due-date">${dueDate}</div>
      <div class="actions">
        <button class="update-button js-update-button">Update</button>
        <button class="delete-button js-delete-button">Delete</button> 
      </div>
    </div> `;
    todoHTML += html;
  });
  document.querySelector(".js-list-container").innerHTML = todoHTML;
 /*  saveToLocalStorage(); */

  //delete button
  const deleteButton = document.querySelectorAll(".js-delete-button");
  deleteButton.forEach((button, index) => {
    button.addEventListener("click", () => {
      todoList.splice(index, 1);
      todoList = todoList;
     /*  saveToLocalStorage(); */
      renderTodoList();
    });
  });

  //update button
  const updateButton = document.querySelectorAll(".js-update-button");
  const texts = document.querySelectorAll(".js-todo-text");
  const dueDates = document.querySelectorAll(".js-due-date");

  updateButton.forEach((button, index) => {
    button.addEventListener("click", function () {
      if (this.innerText === "Update") {
        const textName = texts[index].innerHTML;
        let dueDate = dueDates[index].innerHTML;
        texts[
          index
        ].innerHTML = `<input id="name-${index}" class="update-text-input js-update-text-input" type="search" >
        `;

        dueDates[
          index
        ].innerHTML = `<input id="date-${index}" class="update-due-date js-update-due-date" type="date" value="2000-12-24">`;

        let newNameInput = document.getElementById(`name-${index}`);
        newNameInput.value = textName;

        let newDateInput = document.getElementById(`date-${index}`);

        const splittedDate = dueDate.split(".");
        const day = splittedDate[0];
        const month = splittedDate[1];
        const year = splittedDate[2];
        dueDate = `${year}-${month}-${day}`;
        if (dueDate === "undefined.undefined.") {
          dueDate = "";
        }

        newDateInput.value = dueDate;

        button.innerText = "Save";
      } else if ((button.innerText = "Save")) {
        button.innerText = "Update";
        let newInput = document.getElementById(`name-${index}`);

        texts[index].innerHTML = newInput.value;

        let newDateInput = document.getElementById(`date-${index}`);
        let newDate = newDateInput.value;
        dueDates[index].innerHTML = dayMonthYearFormat(newDate);

        todoList[index].name = texts[index].innerHTML;
        todoList[index].dueDate = dueDates[index].innerHTML;
       /*  saveToLocalStorage(); */
      }
    });
  });
}
