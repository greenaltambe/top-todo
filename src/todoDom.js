import todoManager from "./todoManager.js";
import projectManager from "./projectManager.js";
import { addErrorClass } from "./util.js";

const renderTodosController = (project = null) => {
	const todosContainer = document.querySelector(".todos-container");
	let todosInProject = project
		? todoManager.getTodosByProject(project.title)
		: todoManager.getAllTodos();

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

		let dateLabel = "No due date";
		if (todo.dueDate) {
			const date = new Date(todo.dueDate);
			if (date < new Date()) {
				todoUpper.classList.add("overdue");
			}
			dateLabel = date.toDateString();
		}

		const todoLower = document.createElement("div");
		todoLower.classList.add("todo-lower");
		todoLower.innerHTML = `
			<p>Due: ${dateLabel}</p>
			<p>Priority: ${todo.priority}</p>
			<p>Project: ${todo.project || "None"}</p>
		`;

		todoItemLeft.appendChild(todoUpper);
		todoItemLeft.appendChild(todoLower);

		// Right section
		const todoItemRight = document.createElement("div");
		todoItemRight.classList.add("todo-item-right");

		// Checkbox
		const todoCheckBox = document.createElement("input");
		todoCheckBox.type = "checkbox";
		todoCheckBox.checked = todo.completed;
		todoCheckBox.classList.add("todo-checkbox");

		todoCheckBox.addEventListener("change", () => {
			todoManager.toggleTodo(todo);
			renderTodosController(project);
		});

		// Edit button
		const editTodo = document.createElement("button");
		editTodo.classList.add("edit-todo-button");
		editTodo.textContent = "Edit";

		editTodo.addEventListener("click", () => {
			const editTodoDialog = document.getElementById("edit-todo-dialog");
			editTodoDialog.showModal();

			// Populate form with todo values
			document.getElementById("edit-todo-title").value = todo.title;
			document.getElementById("edit-todo-description").value =
				todo.description;
			document.getElementById("edit-todo-due-date").value = todo.dueDate
				? new Date(todo.dueDate).toISOString().split("T")[0]
				: "";
			document.getElementById("edit-todo-priority").value = todo.priority;

			const editProjectSelect = document.getElementById(
				"edit-todo-project-select"
			);
			editProjectSelect.innerHTML = "";

			// Default "None"
			const defaultOption = document.createElement("option");
			defaultOption.value = "None";
			defaultOption.textContent = "None";
			editProjectSelect.appendChild(defaultOption);

			// Add available projects
			projectManager.getProjects().forEach((proj) => {
				const option = document.createElement("option");
				option.value = proj.title;
				option.textContent = proj.title;
				if (proj.title === todo.project) {
					option.selected = true;
				}
				editProjectSelect.appendChild(option);
			});

			// Handle Update
			const updateBtn = document.getElementById("update-todo-button");
			updateBtn.onclick = () => {
				const updatedTodo = {
					...todo,
					title: document.getElementById("edit-todo-title").value,
					description: document.getElementById(
						"edit-todo-description"
					).value,
					dueDate:
						document.getElementById("edit-todo-due-date").value ||
						null,
					priority:
						document.getElementById("edit-todo-priority").value,
					project:
						document.getElementById("edit-todo-project-select")
							.value === "None"
							? null
							: document.getElementById(
									"edit-todo-project-select"
							  ).value,
				};
				todoManager.updateTodo(todo, updatedTodo);
				editTodoDialog.close();
				renderTodosController(project);
			};

			// Handle Delete
			const deleteBtn = document.getElementById("delete-todo-button");
			deleteBtn.onclick = () => {
				todoManager.deleteTodo(todo);
				editTodoDialog.close();
				renderTodosController(project);
			};
		});

		todoItemRight.appendChild(editTodo);
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

	let dueDate = null;
	if (dueDateInput.value) {
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
