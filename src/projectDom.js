import { renderTodosController } from "./todoDom.js";
import projectManager from "./projectManager.js";

const renderProjectsController = () => {
	const projectsContainer = document.querySelector(".projects");
	projectsContainer.innerHTML = "";
	projectManager.getProjects().forEach((project) => {
		const div = document.createElement("div");
		div.classList.add("project-item");
		div.innerHTML = `<h3>${project.title}</h3> <p>${project.description}</p>`;
		div.addEventListener("click", () => {
			renderTodosController(project);
		});
		projectsContainer.appendChild(div);
	});
};

export { renderProjectsController };
