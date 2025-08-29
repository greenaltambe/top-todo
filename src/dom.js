import projectManager from "./projectManager.js";
import { renderProjectsController } from "./projectDom.js";
import {
	renderTodosController,
	todoEventListener,
	createTodoEventListner,
} from "./todoDom.js";

const dom = (() => {
	const projectDialog = document.getElementById("add-project-dialog");
	const addProjectButton = document.getElementById("add-project-button");
	const createProjectButton = document.getElementById(
		"create-project-button"
	);
	const addTodoButton = document.getElementById("add-todo-button");
	const createTodoButton = document.getElementById("create-todo-button");

	const renderProjects = () => {
		renderProjectsController();
	};

	const renderTodos = (project) => {
		renderTodosController(project);
	};

	const bindEvents = () => {
		addProjectButton.addEventListener("click", () => {
			projectDialog.showModal();
		});

		addTodoButton.addEventListener("click", () => {
			todoEventListener();
		});

		createProjectButton.addEventListener("click", (e) => {
			e.preventDefault();
			const title = document.getElementById("project-name");

			if (!title.value) {
				return;
			}

			const description = document.getElementById("project-description");
			projectManager.addProject(title.value, description.value);
			title.value = "";
			description.value = "";
			projectDialog.close();
			renderProjects();
		});

		createTodoButton.addEventListener("click", (e) => {
			e.preventDefault();
			createTodoEventListner();
		});
	};

	return {
		renderProjects,
		renderTodos,
		bindEvents,
	};
})();

export default dom;
