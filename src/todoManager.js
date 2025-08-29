import Todo from "./todo";

const todoManager = (() => {
	let todos =
		JSON.parse(localStorage.getItem("todos"))?.map(
			(t) =>
				new Todo(
					t._title,
					t._description,
					t._dueDate,
					t._priority,
					t._completed,
					t._project
				)
		) || [];

	const addTodo = (title, description, dueDate, priority, project) => {
		const todo = new Todo(
			title,
			description,
			dueDate,
			priority,
			false,
			project
		);
		todos.push(todo);
		save();
		return todo;
	};

	const deleteTodo = (todo) => {
		todos = todos.filter((t) => t !== todo);
		save();
	};

	const save = () => {
		localStorage.setItem("todos", JSON.stringify(todos));
	};

	const getAllTodos = () => {
		return todos;
	};

	const getTodosByProject = (project) => {
		const projectName =
			typeof project === "string" ? project : project?.title;
		return todos.filter((todo) => todo.project === projectName);
	};

	return {
		addTodo,
		deleteTodo,
		getAllTodos,
		getTodosByProject,
	};
})();

export default todoManager;
