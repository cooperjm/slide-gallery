let galleryOptions = {
	tabs: {
		topTabs: true,
		bottomTabs: false,
		tabLabels: [
			'2000', //
			'2001',
			'2002',
			'2003',
			'2004',
			'2005',
			'2006',
			'2007',
			'2008',
			'2009',
			'2011',
			'2012',
		],
	},
};

slideGallery('slide-gallery', galleryOptions);

function slideGallery(container, options) {
	// TODO get slide gallery container
	const main = {
		container: document.getElementById(container),
		tabs: options.tabs,
	};

	populateGallery();

	// Build the tabs and their containers and append to main container
	function createTabs() {
		const container = document.createElement('DIV');
		if (main.tabs.topTabs) {
			container.id = 'top-tabs';
			container.classList.add('tabs');
		}

		const ul = document.createElement('UL');
		if (main.tabs.tabLabels) {
			main.tabs.tabLabels.forEach((tab) => {
				let daTab = document.createElement('LI');
				daTab.classList.add('tabs__tab');
				daTab.innerHTML = tab;
				ul.appendChild(daTab);
			});
		}
		// Create Indicator
		const tabIndicatorContainer = document.createElement('DIV');
		tabIndicatorContainer.classList.add('indicator-holder');
		const tabIndicator = document.createElement('DIV');
		tabIndicator.id = 'tab-indicator';

		// Add indicator to the tabs container
		tabIndicatorContainer.appendChild(tabIndicator);
		container.appendChild(ul);
		container.appendChild(tabIndicatorContainer);

		// Add tabs container to main object
		main.tabContainer = container;
		main.indicator = tabIndicator;
		main.container.appendChild(main.tabContainer);
		console.log(main);

		// Click event for tabs to scroll
		ul.childNodes.forEach((li) => {
			li.addEventListener('click', (event) => {
				const clicked = event.target.offsetLeft - ul.clientWidth / 2 + event.target.clientWidth / 2;
				console.log(clicked);

				main.tabContainer.scrollTo({
					left: clicked,
					behavior: 'smooth',
				});
			});
		});
	}

	function populateGallery() {
		createTabs();
	}
	//
	//
	// TODO
	// check if tabs are needed, if needed create tabs container then get
	// label array and create tab for each label and append to tabs
	// container,then append container to slide gallery
}
