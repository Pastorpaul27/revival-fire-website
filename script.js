const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("show");
});

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("show");
  });
});

window.addEventListener("load", function () {
  const loader = document.getElementById("loader");

  setTimeout(function () {
    loader.classList.add("hidden");
  }, 1000);
});

const galleryImages = document.querySelectorAll(".gallery-preview");
const lightbox = document.getElementById("gallery-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");

galleryImages.forEach(function (image) {
  image.addEventListener("click", function () {
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    lightbox.classList.add("show");
  });
});

lightboxClose.addEventListener("click", function () {
  lightbox.classList.remove("show");
});

lightbox.addEventListener("click", function (event) {
  if (event.target === lightbox) {
    lightbox.classList.remove("show");
  }
});

// COUNTDOWN TIMER
const eventDate = new Date("December 15, 2026 22:00:00").getTime();

const countdownFunction = setInterval(function () {
  const now = new Date().getTime();
  const distance = eventDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

  if (distance < 0) {
    clearInterval(countdownFunction);
    document.querySelector(".countdown-section").innerHTML = "<h3>The Event Has Started 🔥</h3>";
  }
}, 1000);