"use strict";

var galleryOptions = {
  tabs: {
    topTabs: true,
    bottomTabs: false,
    tabLabels: ['2000', //
    '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2011', '2012']
  }
};
slideGallery('slide-gallery', galleryOptions);

function slideGallery(container, options) {
  // TODO get slide gallery container
  var main = {
    container: document.getElementById(container),
    tabs: options.tabs
  };
  populateGallery(); // Build the tabs and their containers and append to main container

  function createTabs() {
    var container = document.createElement('DIV');

    if (main.tabs.topTabs) {
      container.id = 'top-tabs';
      container.classList.add('tabs');
    }

    var ul = document.createElement('UL');

    if (main.tabs.tabLabels) {
      main.tabs.tabLabels.forEach(function (tab) {
        var daTab = document.createElement('LI');
        daTab.classList.add('tabs__tab');
        daTab.innerHTML = tab;
        ul.appendChild(daTab);
      });
    }

    container.appendChild(ul);
    main.tabContainer = container;
    main.container.appendChild(main.tabContainer); // Click event for tabs to scroll

    ul.childNodes.forEach(function (li) {
      li.addEventListener('click', function (event) {
        var clicked = event.target.offsetLeft - ul.clientWidth / 2 + event.target.clientWidth / 2;
        console.log(clicked);
        main.tabContainer.scrollTo({
          left: clicked,
          behavior: 'smooth'
        });
      });
    });
  }

  function populateGallery() {
    createTabs();
  } //
  //
  // TODO
  // check if tabs are needed, if needed create tabs container then get
  // label array and create tab for each label and append to tabs
  // container,then append container to slide gallery

}