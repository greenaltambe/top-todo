import Project from "./project";
import todoManager from "./todoManager";

const projectManager = (() => {
	let projects = JSON.parse(localStorage.getItem("projects")) || [];

	const addProject = (title, description) => {
		const project = new Project(title, description);
		projects.push(project);
		save();
		return project;
	};

	const removeProject = (project) => {
		projects = projects.filter((p) => p !== project);
		todoManager.getTodosByProject(project).forEach((todo) => {
			todoManager.deleteTodo(todo);
		});
		save();
	};

	const getProjects = () => projects;

	const save = () => {
		localStorage.setItem("projects", JSON.stringify(projects));
	};

	return {
		addProject,
		removeProject,
		getProjects,
	};
})();

export default projectManager;
