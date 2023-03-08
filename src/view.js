const transition = (element, opacity, resolve) => {
	element.style.display = "block";

	// Dont change opacity until the "block" has been processed
	// This is to prevent the transition from happening immediately
	setTimeout(() => {
		element.style.opacity = opacity;
	}, 10);

	// When the transition is done, make "display none if necessary" and resolve the promise
	element.addEventListener("transitionend", () => {
		element.style.display = opacity === 0 ? "none" : "block";
		resolve();
	});
};

const fadeOut = (element) =>
	new Promise((resolve) => transition(element, 0, resolve));

const fadeIn = (element) =>
	new Promise((resolve) => transition(element, 1, resolve));

const fadeOutAll = (elements) =>
	Promise.all(elements.map((element) => fadeOut(element)));

const fadeInAll = (elements) =>
	Promise.all(elements.map((element) => fadeIn(element)));

// A function that gives a collection of data, a page size, and an offset, it gives you a subset of the data
// Example: getPagedElements([1,2,3,4,5], 2, 0) => [1,2]
// Example: getPagedElements([1,2,3,4,5], 3, 1) => [4,5]
const getPagedElements = (elements, pageSize, offset) => {
	const startIndex = offset * pageSize;
	const endIndex = startIndex + pageSize;
	return elements.slice(startIndex, endIndex);
};

const configureInstance = (instance) => {
	let activePage = 0;
	const pageSize = 2;

	const images = Array.from(instance.querySelectorAll(".logo"));
	const imageCount = images.length;

	const activePageElements = () =>
		getPagedElements(images, pageSize, activePage);

	const nextActivePage = () =>
		(activePage + 1) % Math.ceil(imageCount / pageSize);

	const transitionToNextPage = async () => {
		await fadeOutAll(activePageElements());
		activePage = nextActivePage();
		await fadeInAll(activePageElements());
	};

	const start = async () => {
		await fadeInAll(activePageElements());
		setInterval(transitionToNextPage, 4000);
	};

	start();

	return;
};

const handleDocumentLoaded = () => {
	const instances = document.querySelectorAll(".wp-block-emt-logo-showcase");
	instances.forEach(configureInstance);
};

const isDocumentLoaded = () => document.readyState === "complete";

if (isDocumentLoaded()) {
	handleDocumentLoaded();
} else {
	window.addEventListener("load", handleDocumentLoaded);
}
