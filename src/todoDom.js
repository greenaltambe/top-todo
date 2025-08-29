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
		div.innerHTML = `<h3>${todo.title}</h3> <p>${todo.description}</p>`;
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
