// Slideshow Logic
let images = [
  "images/slide1.jpg",
  "images/slide2.jpg",
  "images/slide3.jpg"
];

let current = 0;
const slide = document.getElementById("slide");

function showSlide(index) {
  if (index >= images.length) current = 0;
  else if (index < 0) current = images.length - 1;
  else current = index;

  slide.src = images[current];
}

function nextSlide() {
  showSlide(current + 1);
}

function prevSlide() {
  showSlide(current - 1);
}

// Auto-slide every 5 seconds
setInterval(() => {
  nextSlide();
}, 5000);
