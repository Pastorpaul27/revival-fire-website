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

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("posts-container");

  fetch("posts.json")
    .then(res => res.json())
    .then(posts => {
      container.innerHTML = "";

      posts.forEach(post => {
        container.innerHTML += `
          <div class="post">
            <h3>${post.title}</h3>
            <small>${post.date}</small>
            <p>${post.body}</p>
          </div>
        `;
      });
    })
    .catch(() => {
      container.innerHTML = "<p>Failed to load sermons.</p>";
    });
});

async function loadPosts() {
  const container = document.getElementById("posts-container");
  if (!container) {
    console.log("posts-container not found");
    return;
  }

  const url = "https://raw.githubusercontent.com/Pastorpaul27/revival-fire-website/main/posts/fire-revival.md";
  console.log("Loading post from:", url);

  try {
    const response = await fetch(url);
    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error("Post file not found");
    }

    const text = await response.text();
    console.log("Loaded text:", text);

    const titleMatch = text.match(/title:\s*(.*)/);
    const dateMatch = text.match(/date:\s*(.*)/);
    const parts = text.split("---");
    const body = parts.length >= 3 ? parts[2].trim() : "";

    const title = titleMatch ? titleMatch[1].trim() : "No Title";
    const date = dateMatch ? dateMatch[1].trim() : "";
    const preview = body.length > 160 ? body.substring(0, 160) + "..." : body;

    container.innerHTML = `
      <div class="post">
        <h3>${title}</h3>
        <small>${date}</small>
        <p>${preview}</p>
      </div>
    `;
  } catch (error) {
    console.error("Sermon load error:", error);
    container.innerHTML = "<p>Failed to load sermons.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadPosts);
