import todoManager from "./todoManager.js";
import projectManager from "./projectManager.js";
import { addErrorClass } from "./util.js";

const renderTodosController = (project = null) => {
	const todosContainer = document.querySelector(".todos-container");
	console.log("project", project);
	let todosInProject = project
		? todoManager.getTodosByProject(project.title)
		: todoManager.getAllTodos();
	console.log("todosInProject", todosInProject);

	todosContainer.innerHTML = "";

	todosInProject.forEach((todo) => {
		const div = document.createElement("div");
		div.classList.add("todo-item");
		if (todo.completed) {
			div.classList.add("completed");
		}

		// Left section
		const todoItemLeft = document.createElement("div");
		todoItemLeft.classList.add("todo-item-left");

		const todoUpper = document.createElement("div");
		todoUpper.classList.add("todo-upper");
		todoUpper.innerHTML = `
			<h3>${todo.title}</h3>
			<p>${todo.description}</p>
		`;

		let date = new Date(todo.dueDate);
		if (date < new Date()) {
			todoUpper.classList.add("overdue");
		}

		date = date.toDateString();

		const todoLower = document.createElement("div");
		todoLower.classList.add("todo-lower");
		todoLower.innerHTML = `
			<p>Due: ${date}</p>
			<p>Priority: ${todo.priority}</p>
			<p>Project: ${todo.project || "None"}</p>
		`;

		todoItemLeft.appendChild(todoUpper);
		todoItemLeft.appendChild(todoLower);

		// Right section
		const todoItemRight = document.createElement("div");
		todoItemRight.classList.add("todo-item-right");

		const todoCheckBox = document.createElement("input");
		todoCheckBox.type = "checkbox";
		todoCheckBox.checked = todo.completed;
		todoCheckBox.classList.add("todo-checkbox");

		todoCheckBox.addEventListener("change", () => {
			console.log("todo", todo);
			todoManager.toggleTodo(todo);
			renderTodosController(project);
		});

		todoItemRight.appendChild(todoCheckBox);

		div.appendChild(todoItemLeft);
		div.appendChild(todoItemRight);

		todosContainer.appendChild(div);
	});
};

const todoEventListener = () => {
	const addTodoDialog = document.getElementById("add-todo-dialog");
	addTodoDialog.showModal();

	const todoProjectSelect = document.getElementById("todo-project-select");
	todoProjectSelect.innerHTML = "";

	// Default "None" option
	const defaultOption = document.createElement("option");
	defaultOption.value = "None";
	defaultOption.selected = true;
	defaultOption.textContent = "None";
	todoProjectSelect.appendChild(defaultOption);

	// Add available projects
	projectManager.getProjects().forEach((project) => {
		const option = document.createElement("option");
		option.value = project.title;
		option.textContent = project.title;
		todoProjectSelect.appendChild(option);
	});
};

const createTodoEventListner = () => {
	const addTodoDialog = document.getElementById("add-todo-dialog");
	const title = document.getElementById("todo-title");

	if (!title.value) {
		addErrorClass(title);
		return;
	}

	const description = document.getElementById("todo-description");
	const dueDateInput = document.getElementById("todo-due-date");

	let dueDate;
	if (!dueDateInput.value) {
		dueDate = null;
	} else {
		dueDate = new Date(dueDateInput.value);
		if (dueDate < new Date()) {
			addErrorClass(dueDateInput);
			return;
		}
	}

	const priority = document.getElementById("todo-priority").value;
	const projectValue = document.getElementById("todo-project-select").value;
	const project = projectValue === "None" ? null : projectValue;

	todoManager.addTodo(
		title.value,
		description.value,
		dueDate,
		priority,
		project
	);

	addTodoDialog.close();
	renderTodosController();
};

export { renderTodosController, todoEventListener, createTodoEventListner };
