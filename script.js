/* =========================================
   ATHAR — INTERACTIONS
   ========================================= */


/* HEADER */
const header = document.querySelector(".site-header");

function updateHeader() {
  if (window.scrollY > 60) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeader);
updateHeader();



/* MOBILE MENU */
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuButton && mobileMenu) {

  menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
  });

}



/* SCROLL REVEAL */
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }

    });
  },
  {
    threshold: 0.08
  }
);

revealElements.forEach(element => {
  observer.observe(element);
});



/* EXPLORE PREVIEWS */
const previewData = {

  history: {
    category: "HISTORICAL EVENTS",
    title: "Moments in History",
    text:
      "Revolutions, treaties, partitions and turning points that transformed societies, states and international orders.",
    topics: [
      "Fall of Constantinople",
      "Berlin Conference",
      "Suez Crisis",
      "Iranian Revolution"
    ]
  },

  conflicts: {
    category: "WAR & POWER",
    title: "Conflicts Explained",
    text:
      "Explore why wars began, who was involved, how they developed and the consequences they left behind.",
    topics: [
      "Lebanese Civil War",
      "Iran–Iraq War",
      "Yugoslav Wars",
      "Western Sahara"
    ]
  },

  figures: {
    category: "BIOGRAPHY",
    title: "People Who Shaped History",
    text:
      "Leaders, thinkers, revolutionaries and diplomats whose actions changed states, societies and political ideas.",
    topics: [
      "Ibn Khaldun",
      "Emir Abdelkader",
      "Gamal Abdel Nasser",
      "Patrice Lumumba"
    ]
  },

  ideas: {
    category: "POLITICAL THOUGHT",
    title: "Ideas & Ideologies",
    text:
      "The concepts and theories used to understand power, society, states and international relations.",
    topics: [
      "Nationalism",
      "Realism",
      "Security Dilemma",
      "Self-Determination"
    ]
  },

  countries: {
    category: "STATES & IDENTITY",
    title: "Countries & Nations",
    text:
      "Explore how states formed, disappeared and transformed, and how national identities developed.",
    topics: [
      "Lebanon",
      "Georgia",
      "Algeria",
      "Yugoslavia"
    ]
  },

  borders: {
    category: "TERRITORY",
    title: "Borders & Disputes",
    text:
      "Understand the historical origins of unusual borders, enclaves, corridors and contested territories.",
    topics: [
      "Wakhan Corridor",
      "Caprivi Strip",
      "The Gambia",
      "Nagorno-Karabakh"
    ]
  },

  years: {
    category: "CHRONOLOGY",
    title: "Through the Years",
    text:
      "Follow major historical developments through visual timelines connecting events across decades.",
    topics: [
      "Cold War",
      "Modern Middle East",
      "Post-Soviet Caucasus",
      "Arab Uprisings"
    ]
  },

  maps: {
    category: "GEOGRAPHY",
    title: "Mapping History",
    text:
      "Explore territorial change, empires, borders and political power through historical maps.",
    topics: [
      "Ottoman Empire",
      "Partition of Africa",
      "Breakup of Yugoslavia",
      "Disappearing Empires"
    ]
  }

};


const category = document.getElementById("preview-category");
const title = document.getElementById("preview-title");
const text = document.getElementById("preview-text");
const topics = document.getElementById("preview-topics");


function showPreview(key) {

  const data = previewData[key];

  if (!data) return;

  category.textContent = data.category;
  title.textContent = data.title;
  text.textContent = data.text;

  topics.innerHTML = "";

  data.topics.forEach(topic => {

    const item = document.createElement("span");

    item.textContent = topic;

    topics.appendChild(item);

  });

}


document.querySelectorAll(".browser-row").forEach(row => {

  row.addEventListener("mouseenter", () => {
    showPreview(row.dataset.preview);
  });

  row.addEventListener("focus", () => {
    showPreview(row.dataset.preview);
  });

});



/* HERO MOUSE INTERACTION */
const hero = document.querySelector(".hero");
const glow = document.querySelector(".hero-glow");

if (hero && glow && window.matchMedia("(pointer:fine)").matches) {

  hero.addEventListener("mousemove", event => {

    const bounds = hero.getBoundingClientRect();

    const x =
      (event.clientX - bounds.left) / bounds.width - 0.5;

    const y =
      (event.clientY - bounds.top) / bounds.height - 0.5;

    glow.style.transform =
      `translate(${x * 40}px, ${y * 40}px)`;

  });

  hero.addEventListener("mouseleave", () => {
    glow.style.transform = "translate(0,0)";
  });

}



/* SURPRISE ME */
const randomButton = document.getElementById("random-button");

const destinations = [
  "history.html",
  "conflicts.html",
  "figures.html",
  "ideas.html",
  "countries.html",
  "borders.html",
  "years.html",
  "maps.html",
  "across.html"
];

if (randomButton) {

  randomButton.addEventListener("click", () => {

    const randomPage =
      destinations[
        Math.floor(Math.random() * destinations.length)
      ];

    window.location.href = randomPage;

  });

}
