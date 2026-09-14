(() => {
  "use strict";

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ------------------------------------------------------------------ */
  /* Header: solid on scroll                                            */
  /* ------------------------------------------------------------------ */
  const header = document.getElementById("siteHeader");

  const setHeaderState = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };

  setHeaderState();

  window.addEventListener("scroll", setHeaderState, {
    passive: true
  });

  /* ------------------------------------------------------------------ */
  /* Mobile nav toggle                                                   */
  /* ------------------------------------------------------------------ */
  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  const closeMobileNav = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");
    mobileNav.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const openMobileNav = () => {
    menuToggle.setAttribute("aria-expanded", "true");
    mobileNav.classList.add("is-open");
    mobileNav.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    isOpen ? closeMobileNav() : openMobileNav();
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMobileNav();
    }
  });

  /* ------------------------------------------------------------------ */
  /* Smooth scroll for in-page links                                    */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll("[data-scroll]").forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");

      if (!targetId || !targetId.startsWith("#")) {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      e.preventDefault();

      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  });

  /* ------------------------------------------------------------------ */
  /* Scroll reveal                                                       */
  /* ------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("is-visible");
            }, i * 40);

            io.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px"
      }
    );

    revealEls.forEach((el) => {
      io.observe(el);
    });
  } else {
    revealEls.forEach((el) => {
      el.classList.add("is-visible");
    });
  }

  /* ------------------------------------------------------------------ */
  /* Explore rows: populate hover preview from data-topics              */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll(".explore-row").forEach((row) => {
    const topics = row.dataset.topics;
    const previewEl = row.querySelector(".row-preview");

    if (!topics || !previewEl) {
      return;
    }

    const first = topics
      .split(",")
      .slice(0, 3)
      .map((t) => t.trim())
      .join(" · ");

    previewEl.textContent = first;
  });

  /* ------------------------------------------------------------------ */
  /* Hero: mouse-follow parallax on contour lines                       */
  /* ------------------------------------------------------------------ */
  const hero = document.getElementById("hero");
  const contours = document.querySelectorAll(".contour");

  if (hero && contours.length && !reduceMotion) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let raf = null;

    hero.addEventListener("pointermove", (e) => {
      const rect = hero.getBoundingClientRect();

      targetX =
        (e.clientX - rect.left) / rect.width - 0.5;

      targetY =
        (e.clientY - rect.top) / rect.height - 0.5;

      if (!raf) {
        raf = requestAnimationFrame(animateContours);
      }
    });

    hero.addEventListener("pointerleave", () => {
      targetX = 0;
      targetY = 0;

      if (!raf) {
        raf = requestAnimationFrame(animateContours);
      }
    });

    function animateContours() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      contours.forEach((c, i) => {
        const depth = (i + 1) * 10;

        c.style.transform =
          `translate(${currentX * depth}px, ${currentY * depth * 0.6}px)`;
      });

      if (
        Math.abs(currentX - targetX) > 0.001 ||
        Math.abs(currentY - targetY) > 0.001
      ) {
        raf = requestAnimationFrame(animateContours);
      } else {
        raf = null;
      }
    }
  }

  /* ------------------------------------------------------------------ */
  /* Surprise me: jump to a random section                              */
  /* ------------------------------------------------------------------ */
  const destinations = Array.from(
    document.querySelectorAll(".explore-row")
  ).map((row) => row.getAttribute("href"));

  const goSomewhereRandom = () => {
    if (!destinations.length) {
      return;
    }

    const pick =
      destinations[
        Math.floor(Math.random() * destinations.length)
      ];

    window.location.href = pick;
  };

  document
    .getElementById("surpriseBtn")
    ?.addEventListener("click", goSomewhereRandom);

  document
    .getElementById("surpriseBtn2")
    ?.addEventListener("click", goSomewhereRandom);
})();
