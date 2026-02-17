// *** Gallery page slide ***

// Declare variables
const galleryCarousel = document.getElementById("gallery-carousel");
const galleryTrack = document.querySelector(".gallery-track")
const galleryItems = document.querySelectorAll(".gallery-item");

let currentX = 0
let accumulatedScroll = 0;
let itemWidth

let centralGalleryItem = galleryItems[galleryItems.length / 2]
let timer = null;

// On load, centre the middle gallery item
centreElementRelativeToViewport(centralGalleryItem)

window.addEventListener('resize', (event) => {
    centreElementRelativeToViewport(centralGalleryItem);
})

// Event handler for scrolling
galleryCarousel.addEventListener('wheel', (event) => {

    event.preventDefault();

    itemWidth = galleryItems[0].offsetWidth;
    currentX -= event.deltaY
    accumulatedScroll += event.deltaY;

    horizontalScrollSwipe();

}, false)

function horizontalScrollSwipe() {
    updateXPosition()
    // recycle gallery items at the beginning of end of the carousel
    checkRecycle();

    if (timer !== null) {
        clearTimeout(timer);
    }
    timer = setTimeout( function() {
        // determine the element which is most central
        let trackDistance = 10000, distFromCentre
        // identify most central gallery item
        galleryItems.forEach((item, index) => {
            distFromCentre = Math.abs(positionRelativeToCentre(item))

            if ( distFromCentre < trackDistance ) {
                trackDistance = distFromCentre
                centralGalleryItem = item
            }
        })
        centreElementRelativeToViewport(centralGalleryItem)
    }, 150);
}

// Handle swipe movements
let touchActive;
let touchStartX;

galleryCarousel.addEventListener('touchstart', (event) => {
    touchActive = true;
    touchStartX = event.touches[0].pageX;
})

galleryCarousel.addEventListener('touchmove', (event) => {
    if (!touchActive) return;
    const x = event.touches[0].pageX
    const walk = touchStartX - x
    touchStartX = x
    const wheelEvent = new WheelEvent('wheel', {deltaY: walk})
    galleryCarousel.dispatchEvent(wheelEvent);
})

galleryCarousel.addEventListener('touchend', () => {
    touchActive = false
})


function updateXPosition() {
  galleryTrack.style.transform = `translateX(${currentX}px)`;
}

function centreElementRelativeToViewport(element) {
    const distanceFromCentre = positionRelativeToCentre(element);
    currentX -= distanceFromCentre
    updateXPosition()
}

// Calculate element's position relative to centre
function positionRelativeToCentre(element) {
    const viewportWidth = window.innerWidth;
    const viewportCentreX = viewportWidth / 2;
    const rect = element.getBoundingClientRect();
    const elementCentreX = rect.left + rect.width / 2;
    const deltaX = elementCentreX - viewportCentreX
    return deltaX
}

function checkRecycle() {
  // User scrolled RIGHT enough
  while (accumulatedScroll >= itemWidth) {
    moveFirstToEnd();
    accumulatedScroll -= itemWidth;
  }

  // User scrolled LEFT enough
  while (accumulatedScroll <= -itemWidth) {
    moveLastToStart();
    accumulatedScroll += itemWidth;
  }
}

function moveFirstToEnd() {
  const firstItem = galleryTrack.children[0];

  // Move DOM element
  galleryTrack.appendChild(firstItem);

  // Correct position so it doesn't jump
  currentX += itemWidth;
  updateXPosition();
}

function moveLastToStart() {
  const lastItem = galleryTrack.children[galleryTrack.children.length - 1];

  // Move DOM element
  galleryTrack.prepend(lastItem);

  // Correct position so it doesn't jump
  currentX -= itemWidth;
  updateXPosition();
}

