let galleryOptions = {
	tabs: {
		topTabs: true,
		bottomTabs: false,
		tabLabels: ['2000', '20001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2011', '2012'],
	},
};

slideGallery(galleryOptions);

function slideGallery(options) {
	// TODO get slide gallery container
	const galleryContainer = document.getElementById('slide-gallery');
	const tabs = options.tabs;
	//
	//
	// TODO check if tabs are needed, if needed create tabs container then get label array and create tab for each label and append to tabs container,then append container to slide gallery
}
