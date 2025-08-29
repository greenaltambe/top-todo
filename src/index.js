import "./style.css";
import dom from "./dom.js";

const todoApp = (function () {
	dom.bindEvents();
	dom.renderProjects();
	dom.renderTodos();
})();
