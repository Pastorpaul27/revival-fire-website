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

async function loadPosts() {
  const container = document.getElementById("posts-container");

  try {
    const response = await fetch("https://api.github.com/repos/Pastorpaul27/revival-fire-website/contents/posts");
    const data = await response.json();

    container.innerHTML = "";

    data.forEach(async (file) => {
      const postRes = await fetch(file.download_url);
      const text = await postRes.text();

      const titleMatch = text.match(/title:\s*(.*)/);
      const bodyMatch = text.split('---')[2];

      const title = titleMatch ? titleMatch[1] : "No Title";
      const body = bodyMatch ? body.substring(0, 100) + "..." : "";

      container.innerHTML += `
        <div class="post">
          <h3>${title}</h3>
          <p>${body}</p>
        </div>
      `;
    });

  } catch (error) {
    container.innerHTML = "Failed to load sermons.";
  }
}

loadPosts();