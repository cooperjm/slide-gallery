"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var galleryOptions = {
  tabs: _defineProperty({
    topTabs: true,
    bottomTabs: false,
    tabLabels: true
  }, "tabLabels", ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2011", "2012"])
};
slideGallery(galleryOptions);

function slideGallery(options) {
  // TODO get slide gallery container
  var galleryContainer = document.getElementById("slide-gallery");
  var tabs = options.tabs;
  console.log(tabs); //
  //
  // TODO
  // check if tabs are needed, if needed create tabs container then get
  // label array and create tab for each label and append to tabs
  // container,then append container to slide gallery

  createTabs(tabs);

  function createTabs(tabs) {
    var tabContainer = document.createElement("DIV");
    tabContainer.id = "top-tabs";
    tabContainer.classList.add("tabs");
    var ul = document.createElement("UL");
    var tabCounter = 1;

    if (tabs.topTabs && tabs.tabLabels) {
      tabs.tabLabels.forEach(function (tab) {
        var singleTab = document.createElement("LI");
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