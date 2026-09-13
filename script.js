const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuButton && mainNav) {

  menuButton.addEventListener("click", () => {

    const isOpen = mainNav.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.textContent = isOpen ? "Close" : "Menu";

  });

}


// Close mobile navigation after selecting a link

document.querySelectorAll(".main-nav a").forEach(link => {

  link.addEventListener("click", () => {

    if (!mainNav) return;

    mainNav.classList.remove("open");

    if (menuButton) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "Menu";
    }

  });

});
