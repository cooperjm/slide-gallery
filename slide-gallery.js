let gOptions = {
	images: [
		['https://placedog.net/900/600?random', 'Test Alt Text', 'Test Copy'], // URL, alt text, copy text
		['https://placedog.net/901/600?random', 'Test Alt Text', 'Test Copy'],
		['https://placedog.net/902/600?random', 'Test Alt Text', 'Test Copy'],
		['https://placedog.net/903/600?random', 'Test Alt Text', ''],
		['https://placedog.net/904/600?random', 'Test Alt Text', 'Test Copy'],
		['https://placedog.net/905/600?random', 'Test Alt Text', 'Test Copy'],
		['https://placedog.net/906/600?random', 'Test Alt Text', ''],
		['https://placedog.net/907/600?random', 'Test Alt Text', 'Test Copy'],
		['https://placedog.net/908/600?random', 'Test Alt Text', 'Test Copy'],
		['https://placedog.net/909/600?random', 'Test Alt Text', 'Test Copy'],
		['https://placedog.net/910/600?random', 'Test Alt Text', 'Test Copy'],
		['https://placedog.net/911/600?random', 'Test Alt Text', ''],
	],
	arrowControls: true,
	tabNav: 'none', // top, bottom, or none
	tabNavLabels: [], // Must have same amount as images
	thumbnails: true, // Uses the url from images
};

// console.log(gOptions);

slideGallery('slide-gallery', gOptions);

function slideGallery(container, options) {
	const gallery = {
		galleryRoot: document.getElementById(container),
	};

	createGalleryElements();

	function createGalleryElements() {
		// Create Tabs Container
		const tabs = document.createElement('DIV');
		tabs.id = 'tabs-container';
		tabs.classList.add('tabs');
		gallery.tabs = tabs;

		// Create Images Container
		const galleryContainer = document.createElement('DIV');
		galleryContainer.id = 'gallery-container';
		const imagesContainer = document.createElement('DIV');
		imagesContainer.classList.add('images-container');
		galleryContainer.appendChild(imagesContainer);
		gallery.galleryContainer = galleryContainer;
	}

	function createGalleryComponents() {}

	// const galleryHolder = document.getElementById(container);
	console.log(gallery);
}
