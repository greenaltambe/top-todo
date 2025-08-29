const addErrorClass = (element) => {
	element.classList.add("error");
	setTimeout(() => {
		element.classList.remove("error");
	}, 500);
};

export { addErrorClass };
