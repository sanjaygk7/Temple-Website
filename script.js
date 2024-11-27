

const carousel = document.getElementById('carousel');
let scrollAmount = 0;
const scrollStep = carousel.clientWidth; // Width of one scroll step
const scrollInterval = 3000; // 3 seconds

function autoScroll() {
  scrollAmount += scrollStep;

  if (scrollAmount >= carousel.scrollWidth) {
    scrollAmount = 0; // Reset to the beginning
  }

  carousel.scrollTo({
    left: scrollAmount,
    behavior: 'smooth',
  });
}

// Start the scrolling interval
setInterval(autoScroll, scrollInterval);
