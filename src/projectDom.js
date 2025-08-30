import { renderTodosController } from "./todoDom.js";
import projectManager from "./projectManager.js";
import trashIcon from "./assets/trash-icon.svg";

const renderProjectsController = () => {
	const projectsContainer = document.querySelector(".projects");
	projectsContainer.innerHTML = "";
	projectManager.getProjects().forEach((project) => {
		const div = document.createElement("div");
		div.classList.add("project-item");

		const leftSide = document.createElement("div");
		leftSide.classList.add("left-side");
		leftSide.innerHTML = `<h3>${project.title}</h3> <p>${project.description}</p>`;

		const rightSide = document.createElement("div");
		rightSide.classList.add("right-side");

		const deleteButton = document.createElement("button");
		deleteButton.classList.add("delete-button");

		deleteButton.innerHTML = `<img src="${trashIcon}" alt="Delete" />`;

		deleteButton.addEventListener("click", (e) => {
			e.stopPropagation();
			projectManager.removeProject(project);
			renderProjectsController();
		});

		rightSide.appendChild(deleteButton);
		div.appendChild(leftSide);
		div.appendChild(rightSide);

		div.addEventListener("click", () => {
			renderTodosController(project);
		});

		projectsContainer.appendChild(div);
	});
};

export { renderProjectsController };
