const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".main-nav a");

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
    threshold: 0.45
  }
);

sections.forEach(section => observer.observe(section));
