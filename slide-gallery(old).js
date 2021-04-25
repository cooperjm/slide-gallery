let galleryOptions = {
	gallery: {
		images: [],
		contols: false,
	},
	tabs: {
		tabsPosition: "top",
		tabLabels: [
			"2000", //
			"2001",
			"2002",
			"2003",
			"2004",
			"2005",
			"2006",
			"2007",
			"2008",
			"2009",
			"2011",
			"2012",
		],
	},
};

slideGallery("slide-gallery", galleryOptions);

function slideGallery(container, options) {
	// Object where components are referenced
	const main = {
		container: document.getElementById(container),
		tabs: options.tabs,
	};

	populateSlideGallery();

	// Build the tabs and their container then append to main container
	function populateTabs() {
		const container = document.createElement("DIV");
		const ul = document.createElement("UL");
		container.id = "tabs-container";
		container.classList.add("tabs");
		// Add tabs container to main object
		main.tabContainer = container;

		createTabs(main.tabs.tabLabels);
		function createTabs(tabLabels) {
			if (tabLabels) {
				tabLabels.forEach((tab) => {
					const daTab = document.createElement("LI");
					daTab.classList.add("tabs__tab");
					daTab.innerHTML = tab;
					ul.appendChild(daTab);
				});
			}
			container.appendChild(ul);
		}

		main.container.appendChild(main.tabContainer);
		console.log(main);

		// Click event for tabs to scroll
		ul.childNodes.forEach((li) => {
			li.addEventListener("click", (event) => {
				const clicked =
					event.target.offsetLeft -
					ul.clientWidth / 2 +
					event.target.clientWidth / 2;
				console.log(clicked);

				main.tabContainer.scrollTo({
					left: clicked,
					behavior: "smooth",
				});
			});
		});

		// Create and Add indicator to the tabs container
		createIndicator(container);

		function createIndicator(whereToAppendIndicator) {
			// Create Indicator
			const tabIndicatorContainer = document.createElement("DIV");
			tabIndicatorContainer.classList.add("indicator-holder");
			const tabIndicator = document.createElement("DIV");
			tabIndicator.id = "indicator";
			tabIndicatorContainer.appendChild(tabIndicator);
			whereToAppendIndicator.appendChild(tabIndicatorContainer);
			// Add indicator to main obj
			main.indicator = tabIndicator;
		}
	}

	function populateSlideGallery() {
		populateTabs();
	}
}
