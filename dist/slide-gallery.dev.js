"use strict";

var gOptions = {
  images: [// URL, alt text, copy text
  ['https://placedog.net/1100/600?random', 'Test Alt Text', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus esse itaque iusto nesciunt vero, dolore totam obcaecati aut quos veniam, reiciendis modi vel porro ea. Vel pariatur non quam quibusdam.'], ['https://placedog.net/1101/600?random', 'Test Alt Text', 'Test Copy'], ['https://placedog.net/1102/600?random', 'Test Alt Text', 'Test Copy'], ['https://placedog.net/1103/600?random', 'Test Alt Text'], ['https://placedog.net/1104/600?random', 'Test Alt Text', 'Test Copy'], ['https://placedog.net/1105/600?random', 'Test Alt Text', 'Test Copy'], ['https://placedog.net/1106/600?random', 'Test Alt Text', ''], ['https://placedog.net/1107/600?random', 'Test Alt Text', 'Test Copy'], ['https://placedog.net/1108/600?random', 'Test Alt Text', 'Test Copy'], ['https://placedog.net/1109/600?random', 'Test Alt Text', 'Test Copy'], ['https://placedog.net/1110/600?random', 'Test Alt Text', 'Test Copy'], ['https://placedog.net/1111/600?random', 'Test Alt Text', '']],
  pictureText: false,
  textOverlay: true,
  arrowControls: true,
  tabNav: 'none',
  // top, bottom, or none //TODO add bottom
  tabNavLabels: ['Tab-1', // Must have same amount as images
  'Tab-2', 'Tab-3', 'Tab-4', 'Tab-5', 'Tab-6', 'Tab-7', 'Tab-8', 'Tab-9', 'Tab-10', 'Tab-11', 'Tab-12'],
  thumbnails: true // Uses the url from images

};
slideGallery('slide-gallery', gOptions);

function slideGallery(container, options) {
  var gallery = {
    galleryRoot: document.getElementById(container),
    count: 0
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
    if (options.tabNav == 'bottom') {
      buildGallery();
      buildTabs();
    } else if (options.tabNav == 'top') {
      buildTabs();
      buildGallery();
    } else {
      buildGallery();
    }

    buildThumbnails();

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
                var index = e.target.dataset.index;
                gallery.count = index;
                gallery.currentArrowScrollWidth = index * 100; // Move Gallery Images depending on which tab is clicked

                gallery.imagesContainer.style.transform = 'translateX(' + -index + '00%' + ')'; // Scroll tab bar

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
      gallery.maxPercentScrollWidth = gallery.numberOfImages * 100;
      gallery.currentArrowScrollWidth = 0;
      options.images.forEach(function (img) {
        var slide = document.createElement('DIV');
        slide.classList.add('slide');
        var image = document.createElement('DIV');
        image.classList.add('image');
        var picture = document.createElement('IMG');
        picture.src = img[0];
        picture.alt = img[1];
        picture.text = img[2];

        if (options.textOverlay) {
          var textOverlay = document.createElement('DIV');
          textOverlay.classList.add('textOverlay');
          textOverlay.innerHTML = img[1];
          image.appendChild(textOverlay);
        }

        image.appendChild(picture);
        slide.appendChild(image);
        gallery.imagesContainer.appendChild(slide);

        if (gallery.pictureText) {
          if (picture.text != '' && picture.text != 'undefined' && picture.text != null) {
            var picText = document.createElement('DIV');
            picText.classList.add('image-text');
            var textWrapper = document.createElement('DIV');
            textWrapper.classList.add('text-wrapper');
            textWrapper.innerText = picture.text;
            picText.appendChild(textWrapper);
            slide.appendChild(picText);
          }
        }
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
            gallery.count--;

            if (gallery.tabs.firstChild) {
              //alert('f')
              document.querySelector('[data-index="' + gallery.count + '"]').click();
            }

            if (gallery.thumbnailContainer.firstChild) {
              //alert('f')
              document.querySelector('[data-index="' + gallery.count + '"]').click();
            } // gallery.imagesContainer.style.left = -gallery.currentArrowScrollWidth + '%';


            gallery.imagesContainer.style.transform = 'translateX(' + -gallery.currentArrowScrollWidth + '%' + ')';
          }
        });
        var rightArrow = document.createElement('SPAN');
        rightArrow.classList.add('right', 'arrow');
        rightArrow.setAttribute('tabindex', '0');
        arrowControls.appendChild(rightArrow);
        rightArrow.addEventListener('click', function (e) {
          if (gallery.currentArrowScrollWidth < gallery.maxPercentScrollWidth) {
            gallery.currentArrowScrollWidth += 100;
            gallery.count++;

            if (gallery.tabs.firstChild) {
              //alert('f')
              document.querySelector('[data-index="' + gallery.count + '"]').click();
            }

            if (gallery.thumbnailContainer.firstChild) {
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
      var selectedThumbnail;
      var previousSelectedThumbnail;
      var ul = document.createElement('UL');
      var i = 0;
      options.images.forEach(function (img) {
        var li = document.createElement('LI');
        var thumbnail = document.createElement('IMG');
        li.classList.add('thumbnail');
        thumbnail.setAttribute('data-index', i);

        if (thumbnail.dataset.index == 0) {
          thumbnail.classList.add('selectedThumbnail');
          previousSelectedThumbnail = thumbnail;
        }

        thumbnail.src = img[0];
        thumbnail.alt = img[1];
        li.appendChild(thumbnail);
        ul.appendChild(li);
        li.addEventListener('click', function (e) {
          var index = e.target.dataset.index;
          previousSelectedThumbnail.classList.remove('selectedThumbnail');
          selectedThumbnail = e.target;
          selectedThumbnail.classList.add('selectedThumbnail');
          gallery.count = index;
          gallery.currentArrowScrollWidth = index * 100; // Move Gallery Images depending on which thumbnail is clicked

          gallery.imagesContainer.style.transform = 'translateX(' + -index + '00%' + ')'; // Scroll thumbnail bar

          var clicked = e.target.offsetLeft - ul.clientWidth / 2 + e.target.clientWidth / 2;
          gallery.thumbnailContainer.scrollTo({
            left: clicked,
            behavior: 'smooth'
          });
          previousSelectedThumbnail = selectedThumbnail;
        });
        i++;
      });
      gallery.thumbnailContainer.appendChild(ul);
    }
  } // const galleryHolder = document.getElementById(container);


  console.log('GALLERY OBJECT', gallery);
  console.log('OPTIONS OBJECT', options);
}