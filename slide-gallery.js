let galleryOptions = {
	tabs: {
		topTabs: true,
		bottomTabs: false,
		tabLabels: true,
		tabLabels: [
			"2000",
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

slideGallery(galleryOptions);

function slideGallery(options) {
	// TODO get slide gallery container
	const galleryContainer = document.getElementById("slide-gallery");
	const tabs = options.tabs;
	console.log(tabs);
	//
	//
	// TODO
	// check if tabs are needed, if needed create tabs container then get
	// label array and create tab for each label and append to tabs
	// container,then append container to slide gallery

	createTabs(tabs);
	function createTabs(tabs) {
		const tabContainer = document.createElement("DIV");
		tabContainer.id = "top-tabs";
		tabContainer.classList.add("tabs");
		const ul = document.createElement("UL");
		let tabCounter = 1;
		if (tabs.topTabs && tabs.tabLabels) {
			tabs.tabLabels.forEach((tab) => {
				const singleTab = document.createElement("LI");
				singleTab.classList.add("tabs__tab", "tab" + tabCounter);
				tabCounter++;
				singleTab.innerHTML = tab;
				ul.appendChild(singleTab);
			});
		}
		tabContainer.appendChild(ul);
		galleryContainer.appendChild(tabContainer);
	}
}
