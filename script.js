const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
const navLinks = document.querySelectorAll(".main-nav a");


// MOBILE MENU

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");

  menuToggle.classList.toggle("active", isOpen);
  document.body.classList.toggle("menu-open", isOpen);

  menuToggle.setAttribute("aria-expanded", isOpen);
});


navLinks.forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.classList.remove("active");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
  });
});


// ACTIVE NAV ITEM ON SCROLL

const sections = document.querySelectorAll("main section[id]");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${entry.target.id}`) {
          link.classList.add("active");
        }
      });

    });
  },
  {
    threshold: 0.35
  }
);

sections.forEach(section => observer.observe(section));


// HEADER SHADOW ON SCROLL

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 20) {
    header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
  } else {
    header.style.boxShadow = "none";
  }

});
