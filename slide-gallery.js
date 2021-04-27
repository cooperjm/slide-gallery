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
	tabNav: 'top', // top, bottom, or none
	tabNavLabels: ['Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab', 'Tab'], // Must have same amount as images
	thumbnails: false, // Uses the url from images
};

// console.log(gOptions);

slideGallery('slide-gallery', gOptions);

function slideGallery(container, options) {
	const gallery = {
		galleryRoot: document.getElementById(container),
	};

	createGalleryElements();

	createGalleryComponents();

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

		// Create Thumbnail Container
		const thumbnailContainer = document.createElement('DIV');
		thumbnailContainer.id = 'thumbnail-container';
		gallery.thumbnailContainer = thumbnailContainer;

		console.log('OPTIONS OBJECT', options);

		if (options.tabNav == 'top') {
			gallery.galleryRoot.appendChild(gallery.tabs);
		}

		gallery.galleryRoot.appendChild(galleryContainer);

		if (options.tabNav == 'bottom') {
			gallery.galleryRoot.appendChild(gallery.tabs);
		}

		if (options.thumbnails) {
			gallery.galleryRoot.appendChild(thumbnailContainer);
		}
	}

	function createGalleryComponents() {
		buildTabs();

		function buildTabs() {
			// Generate the tabs from the tab labels given in the options
			if (options.tabNav != 'none') {
				const tabsContainer = document.createElement('DIV');
				tabsContainer.id = 'tabs-container';
				tabsContainer.classList.add('tabs');
				const ul = document.createElement('UL');
				for (let tab of options.tabNavLabels) {
					const li = document.createElement('LI');
					li.innerText = tab;
					li.classList.add('tabs__tab');
					ul.appendChild(li);
				}
				tabsContainer.appendChild(ul);
				gallery.tabs.appendChild(tabsContainer);

				// Create Indicator
				const indicatorContainer = document.createElement('DIV');
				indicatorContainer.id = 'indicator-container';
				const indicator = document.createElement('DIV');
				indicator.classList.add('indicator');
				indicatorContainer.appendChild(indicator);
				tabsContainer.appendChild(indicatorContainer);
			}
		}
	}

	// const galleryHolder = document.getElementById(container);
	console.log('GALLERY OBJECT', gallery);
}
