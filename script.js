let todos = JSON.parse(localStorage.getItem("todos")) || [];
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
  const input = document.getElementById("task");
  const text = input.value;

  if (text === "") return;

  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false
  };

  todos.push(newTodo);
  saveTodos();
  displayTodos(todos);

  input.value = "";
}


function displayTodos(data) {
  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(todo => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${todo.text} ${todo.completed ? "✔️" : ""}
      <button onclick="toggle(${todo.id})">Done</button>
      <button onclick="removeTodo(${todo.id})">Delete</button>
    `;

    list.appendChild(li);
  });
}

function toggle(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });

  saveTodos();
  displayTodos(todos);
}


function removeTodo(id) {
  todos = todos.filter(todo => todo.id !== id);

  saveTodos();
  displayTodos(todos);
}


function filterTodos(type) {
  if (type === "completed") {
    displayTodos(todos.filter(t => t.completed));
  } else if (type === "pending") {
    displayTodos(todos.filter(t => !t.completed));
  } else {
    displayTodos(todos);
  }
}

displayTodos(todos);

 
