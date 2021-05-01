"use strict";

var gOptions = {
  images: [['https://placedog.net/900/600?random', 'Test Alt Text', 'Test Copy'], // URL, alt text, copy text
  ['https://placedog.net/901/600?random', 'Test Alt Text', 'Test Copy'], ['https://placedog.net/902/600?random', 'Test Alt Text', 'Test Copy'], ['https://placedog.net/903/600?random', 'Test Alt Text', ''], ['https://placedog.net/904/600?random', 'Test Alt Text', 'Test Copy'], ['https://placedog.net/905/600?random', 'Test Alt Text', 'Test Copy'], ['https://placedog.net/906/600?random', 'Test Alt Text', ''], ['https://placedog.net/907/600?random', 'Test Alt Text', 'Test Copy'], ['https://placedog.net/908/600?random', 'Test Alt Text', 'Test Copy'], ['https://placedog.net/909/600?random', 'Test Alt Text', 'Test Copy'], ['https://placedog.net/910/600?random', 'Test Alt Text', 'Test Copy'], ['https://placedog.net/911/600?random', 'Test Alt Text', '']],
  arrowControls: true,
  tabNav: 'none',
  // top, bottom, or none
  tabNavLabels: ['Tab-1', // Must have same amount as images
  'Tab-2', 'Tab-3', 'Tab-4', 'Tab-5', 'Tab-6', 'Tab-7', 'Tab-8', 'Tab-9', 'Tab-10', 'Tab-11', 'Tab-12'],
  thumbnails: false // Uses the url from images

}; // console.log(gOptions);

slideGallery('slide-gallery', gOptions);

function slideGallery(container, options) {
  var gallery = {
    galleryRoot: document.getElementById(container)
  };
  createGalleryElements();
  createGalleryComponents();

  function createGalleryElements() {
    // Create Tabs Container
    var tabs = document.createElement('DIV');
    tabs.id = 'tabs-container';
    tabs.classList.add('tabs');
    gallery.tabs = tabs; // Create Images Container

    var galleryContainer = document.createElement('DIV');
    galleryContainer.id = 'gallery-container';
    var imagesContainer = document.createElement('DIV');
    imagesContainer.classList.add('images-container');
    imagesContainer.style.left = '0%';
    galleryContainer.appendChild(imagesContainer);
    gallery.imagesContainer = imagesContainer;
    gallery.galleryContainer = galleryContainer; // Create Thumbnail Container

    var thumbnailContainer = document.createElement('DIV');
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
        (function () {
          var ul = document.createElement('UL');
          var i = 0;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = options.tabNavLabels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var tab = _step.value;
              var li = document.createElement('LI');
              li.innerText = tab;
              li.classList.add('tabs__tab');
              li.setAttribute('data-index', i);
              ul.appendChild(li);
              li.addEventListener('click', function (e) {
                var index = e.target.dataset.index; // Move Gallery Images depending on which tab is clicked

                gallery.imagesContainer.style.left = -index + '00%'; // Scroll tab bar

                var clicked = e.target.offsetLeft - ul.clientWidth / 2 + e.target.clientWidth / 2;
                gallery.tabs.scrollTo({
                  left: clicked,
                  behavior: 'smooth'
                });
                gallery.indicator.style.left = e.target.offsetLeft + 'px';
                gallery.indicator.style.width = e.target.offsetWidth + 'px';
              });
              i++;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          gallery.tabs.appendChild(ul); // Create Indicator

          var indicatorContainer = document.createElement('DIV');
          indicatorContainer.id = 'indicator-container';
          var indicator = document.createElement('DIV');
          indicator.classList.add('indicator');
          indicatorContainer.appendChild(indicator);
          gallery.tabs.appendChild(indicatorContainer);
          gallery.indicator = indicator;
        })();
      }
    }

    function buildGallery() {
      gallery.numberOfImages = options.images.length - 1;
      gallery.maxScrollWidth = gallery.numberOfImages * 100;
      gallery.currentArrowScrollWidth = 0;
      options.images.forEach(function (img) {
        var slide = document.createElement('DIV');
        slide.classList.add('slide');
        var image = document.createElement('DIV');
        image.classList.add('image');
        var picture = document.createElement('IMG');
        picture.src = img[0];
        picture.alt = img[1];
        image.appendChild(picture);
        slide.appendChild(image);
        gallery.imagesContainer.appendChild(slide);
      });

      if (options.arrowControls) {
        var arrowControls = document.createElement('DIV');
        arrowControls.id = 'arrow-controls';
        var leftArrow = document.createElement('SPAN');
        leftArrow.classList.add('left', 'arrow');
        leftArrow.setAttribute('tabindex', '0');
        arrowControls.appendChild(leftArrow);
        leftArrow.addEventListener('click', function (e) {
          if (gallery.currentArrowScrollWidth > 0) {
            gallery.currentArrowScrollWidth -= 100;
            gallery.imagesContainer.style.left = -gallery.currentArrowScrollWidth + '%';
          }
        });
        var rightArrow = document.createElement('SPAN');
        rightArrow.classList.add('right', 'arrow');
        rightArrow.setAttribute('tabindex', '0');
        arrowControls.appendChild(rightArrow);
        rightArrow.addEventListener('click', function (e) {
          if (gallery.currentArrowScrollWidth < gallery.maxScrollWidth) {
            gallery.currentArrowScrollWidth += 100;
            gallery.imagesContainer.style.left = -gallery.currentArrowScrollWidth + '%';
          }
        });
        gallery.galleryContainer.appendChild(arrowControls);
      }
    }
  } // const galleryHolder = document.getElementById(container);


  console.log('GALLERY OBJECT', gallery);
  console.log('OPTIONS OBJECT', options);
}