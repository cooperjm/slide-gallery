let gOptions = {
	images: [
		// URL, alt text, copy text
		[
			'https://placedog.net/900/600?random',
			'Test Alt Text',
			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus esse itaque iusto nesciunt vero, dolore totam obcaecati aut quos veniam, reiciendis modi vel porro ea. Vel pariatur non quam quibusdam.',
		],
		['https://placedog.net/901/600?random', 'Test Alt Text', 'Test Copy'],
		['https://placedog.net/402/600?random', 'Test Alt Text', 'Test Copy'],
		['https://placedog.net/903/600?random', 'Test Alt Text'],
		['https://placedog.net/904/600?random', 'Test Alt Text', 'Test Copy'],
		['https://placedog.net/905/600?random', 'Test Alt Text', 'Test Copy'],
		['https://placedog.net/906/600?random', 'Test Alt Text', ''],
		['https://placedog.net/907/600?random', 'Test Alt Text', 'Test Copy'],
		['https://placedog.net/908/600?random', 'Test Alt Text', 'Test Copy'],
		['https://placedog.net/909/600?random', 'Test Alt Text', 'Test Copy'],
		['https://placedog.net/910/600?random', 'Test Alt Text', 'Test Copy'],
		['https://placedog.net/911/600?random', 'Test Alt Text', ''],
	],
	pictureText: false,
	arrowControls: true,
	tabNav: 'none', // top, bottom, or none //TODO add bottom
	tabNavLabels: [
		'Tab-1', // Must have same amount as images
		'Tab-2',
		'Tab-3',
		'Tab-4',
		'Tab-5',
		'Tab-6',
		'Tab-7',
		'Tab-8',
		'Tab-9',
		'Tab-10',
		'Tab-11',
		'Tab-12',
	],
	thumbnails: true, // Uses the url from images
};

slideGallery('slide-gallery', gOptions);

function slideGallery(container, options) {
	const gallery = {
		galleryRoot: document.getElementById(container),
		count: 0,
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

		buildThumbnails();

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
						gallery.count = index;
						gallery.currentArrowScrollWidth = index * 100;

						// Move Gallery Images depending on which tab is clicked
						gallery.imagesContainer.style.transform = 'translateX(' + -index + '00%' + ')';

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
			gallery.numberOfImages = options.images.length - 1;
			gallery.maxPercentScrollWidth = gallery.numberOfImages * 100;
			gallery.currentArrowScrollWidth = 0;

			options.images.forEach((img) => {
				const slide = document.createElement('DIV');
				slide.classList.add('slide');

				const image = document.createElement('DIV');
				image.classList.add('image');

				const picture = document.createElement('IMG');
				picture.src = img[0];
				picture.alt = img[1];
				picture.text = img[2];

				image.appendChild(picture);
				slide.appendChild(image);
				gallery.imagesContainer.appendChild(slide);

				if (gallery.pictureText) {
					if (picture.text != '' && picture.text != 'undefined' && picture.text != null) {
						const picText = document.createElement('DIV');
						picText.classList.add('image-text');
						const textWrapper = document.createElement('DIV');
						textWrapper.classList.add('text-wrapper');
						textWrapper.innerText = picture.text;
						picText.appendChild(textWrapper);
						slide.appendChild(picText);
					}
				}
					

				
			});

			if (options.arrowControls) {
				const arrowControls = document.createElement('DIV');
				arrowControls.id = 'arrow-controls';

				const leftArrow = document.createElement('SPAN');
				leftArrow.classList.add('left', 'arrow');
				leftArrow.setAttribute('tabindex', '0');
				arrowControls.appendChild(leftArrow);

				leftArrow.addEventListener('click', (e) => {
					if (gallery.currentArrowScrollWidth > 0) {
						gallery.currentArrowScrollWidth -= 100;
						gallery.count--;

						if (gallery.tabs.firstChild) {
							//alert('f')
							document.querySelector('[data-index="' + gallery.count + '"]').click();
						}

						// gallery.imagesContainer.style.left = -gallery.currentArrowScrollWidth + '%';
						gallery.imagesContainer.style.transform = 'translateX(' + -gallery.currentArrowScrollWidth + '%' + ')';
					}
				});

				const rightArrow = document.createElement('SPAN');
				rightArrow.classList.add('right', 'arrow');
				rightArrow.setAttribute('tabindex', '0');
				arrowControls.appendChild(rightArrow);

				rightArrow.addEventListener('click', (e) => {
					if (gallery.currentArrowScrollWidth < gallery.maxPercentScrollWidth) {
						gallery.currentArrowScrollWidth += 100;
						gallery.count++;
						if (gallery.tabs.firstChild) {
							//alert('f')
							document.querySelector('[data-index="' + gallery.count + '"]').click();
						}
						gallery.imagesContainer.style.transform = 'translateX(' + -gallery.currentArrowScrollWidth + '%' + ')';
					}
				});

				gallery.galleryContainer.appendChild(arrowControls);
			}
		}

		function buildThumbnails() {
			
			const ul = document.createElement('UL');

			options.images.forEach((img) => {
				const li = document.createElement('LI');
				const thumbnail = document.createElement('IMG');
				li.classList.add('thumbnail');
				thumbnail.src = img[0];
				thumbnail.alt = img[1];
				li.appendChild(thumbnail);
				ul.appendChild(li);
			});
			gallery.thumbnailContainer.appendChild(ul);
			
		}
	}

	// const galleryHolder = document.getElementById(container);
	console.log('GALLERY OBJECT', gallery);
	console.log('OPTIONS OBJECT', options);
}
