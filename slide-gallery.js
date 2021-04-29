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
	tabNavLabels: ['Tab-1', 'Tab-2', 'Tab-3', 'Tab-4', 'Tab-5', 'Tab-6', 'Tab-7', 'Tab-8', 'Tab-9', 'Tab-10', 'Tab-11', 'Tab-12'], // Must have same amount as images
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
		gallery.imagesContainer = imagesContainer;
		gallery.galleryContainer = galleryContainer;

		// Create Thumbnail Container
		const thumbnailContainer = document.createElement('DIV');
		thumbnailContainer.id = 'thumbnail-container';
		gallery.thumbnailContainer = thumbnailContainer;

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

		buildGallery();

		function buildTabs() {
			// Generate the tabs from the tab labels given in the options
			if (options.tabNav != 'none') {
				const ul = document.createElement('UL');
				let i = 0;
				for (let tab of options.tabNavLabels) {
					const li = document.createElement('LI');
					li.innerText = tab;
					li.classList.add('tabs__tab');
					li.setAttribute('data-index', i);
					ul.appendChild(li);
					li.addEventListener('click', (e) => {
						const index = e.target.dataset.index;

						// Move Gallery Images depending on which tab is clicked
						gallery.imagesContainer.style.left = -index + '00%';

						// Scroll tab bar
						const clicked = e.target.offsetLeft - ul.clientWidth / 2 + e.target.clientWidth / 2;
						gallery.tabs.scrollTo({
							left: clicked,
							behavior: 'smooth',
						});
						gallery.indicator.style.left = e.target.offsetLeft + 'px';
						gallery.indicator.style.width = e.target.offsetWidth + 'px';
					});
					i++;
				}
				gallery.tabs.appendChild(ul);

				// Create Indicator
				const indicatorContainer = document.createElement('DIV');
				indicatorContainer.id = 'indicator-container';
				const indicator = document.createElement('DIV');
				indicator.classList.add('indicator');
				indicatorContainer.appendChild(indicator);
				gallery.tabs.appendChild(indicatorContainer);
				gallery.indicator = indicator;
			}
		}

		function buildGallery() {
			options.images.forEach((img) => {
				const slide = document.createElement('DIV');
				slide.classList.add('slide');

				const image = document.createElement('DIV');
				image.classList.add('image');

				const picture = document.createElement('IMG');
				picture.src = img[0];
				picture.alt = img[1];

				image.appendChild(picture);
				slide.appendChild(image);
				gallery.imagesContainer.appendChild(slide);
			});
			// console.log(gallery.imagesContainer);
		}
	}

	// const galleryHolder = document.getElementById(container);
	console.log('GALLERY OBJECT', gallery);
	console.log('OPTIONS OBJECT', options);
}
