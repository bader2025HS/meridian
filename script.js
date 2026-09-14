/* ========================================
   ATHAR
======================================== */


/* ----------------------------------------
   HEADER
----------------------------------------- */

const header =
  document.querySelector(".site-header");


function updateHeader() {

  if (window.scrollY > 40) {

    header.classList.add("scrolled");

  } else {

    header.classList.remove("scrolled");

  }

}


window.addEventListener(
  "scroll",
  updateHeader
);


updateHeader();



/* ----------------------------------------
   MOBILE MENU
----------------------------------------- */

const menuToggle =
  document.querySelector(".menu-toggle");


const mobileMenu =
  document.querySelector(".mobile-menu");


menuToggle.addEventListener(
  "click",
  () => {

    const open =
      mobileMenu.classList.toggle("open");


    menuToggle.classList.toggle(
      "open",
      open
    );


    menuToggle.setAttribute(
      "aria-expanded",
      open
    );


    document.body.style.overflow =
      open
        ? "hidden"
        : "";

  }
);


document
  .querySelectorAll(".mobile-menu a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        mobileMenu
          .classList
          .remove("open");


        menuToggle
          .classList
          .remove("open");


        document.body.style.overflow = "";

      }
    );

  });



/* ----------------------------------------
   EXPLORE DATA
----------------------------------------- */

const previewData = {

  history: {

    number: "01",

    kicker:
      "HISTORICAL EVENTS",

    title:
      "Moments in History",

    description:
      "Discover the revolutions, treaties, partitions and turning points that transformed societies and states.",

    topics: [
      "Fall of Constantinople",
      "Berlin Conference",
      "Suez Crisis"
    ]

  },


  conflicts: {

    number: "02",

    kicker:
      "WAR & POWER",

    title:
      "Conflicts Explained",

    description:
      "Understand how conflicts began, who fought them, how they evolved and what they left behind.",

    topics: [
      "Lebanese Civil War",
      "Iran–Iraq War",
      "Yugoslav Wars"
    ]

  },


  figures: {

    number: "03",

    kicker:
      "BIOGRAPHY",

    title:
      "People Who Shaped History",

    description:
      "Explore the leaders, thinkers, revolutionaries and diplomats who changed societies and political orders.",

    topics: [
      "Ibn Khaldun",
      "Patrice Lumumba",
      "Gamal Abdel Nasser"
    ]

  },


  ideas: {

    number: "04",

    kicker:
      "POLITICAL THOUGHT",

    title:
      "Ideas & Ideologies",

    description:
      "Understand the concepts used to explain states, power, conflict and political change.",

    topics: [
      "Nationalism",
      "Realism",
      "Security Dilemma"
    ]

  },


  countries: {

    number: "05",

    kicker:
      "STATES & IDENTITY",

    title:
      "Countries & Nations",

    description:
      "Explore how countries were formed, transformed, divided and sometimes disappeared.",

    topics: [
      "Lebanon",
      "Georgia",
      "Yugoslavia"
    ]

  },


  borders: {

    number: "06",

    kicker:
      "TERRITORY",

    title:
      "Borders & Disputes",

    description:
      "Follow the historical decisions that created borders, enclaves, corridors and disputed territories.",

    topics: [
      "Wakhan Corridor",
      "Caprivi Strip",
      "Nagorno-Karabakh"
    ]

  },


  years: {

    number: "07",

    kicker:
      "CHRONOLOGY",

    title:
      "Through the Years",

    description:
      "Follow major historical developments through visual timelines that connect events over decades.",

    topics: [
      "Cold War",
      "Modern Middle East",
      "Arab Uprisings"
    ]

  },


  maps: {

    number: "08",

    kicker:
      "GEOGRAPHY",

    title:
      "Mapping History",

    description:
      "See how territories, states, borders and empires changed through maps.",

    topics: [
      "Ottoman Empire",
      "Partition of Africa",
      "Breakup of Yugoslavia"
    ]

  }

};



const rows =
  document.querySelectorAll(
    ".explore-row"
  );


const previewNumber =
  document.querySelector(
    ".preview-number"
  );


const previewKicker =
  document.querySelector(
    "#preview-kicker"
  );


const previewTitle =
  document.querySelector(
    "#preview-title"
  );


const previewDescription =
  document.querySelector(
    "#preview-description"
  );


const previewTopics =
  document.querySelector(
    "#preview-topics"
  );



function changePreview(key) {

  const data =
    previewData[key];


  if (!data) return;


  rows.forEach(row => {

    row.classList.remove("active");

  });


  const activeRow =
    document.querySelector(
      `[data-preview="${key}"]`
    );


  activeRow.classList.add("active");


  previewNumber.textContent =
    data.number;


  previewKicker.textContent =
    data.kicker;


  previewTitle.textContent =
    data.title;


  previewDescription.textContent =
    data.description;


  previewTopics.innerHTML = "";


  data.topics.forEach(topic => {

    const span =
      document.createElement("span");


    span.textContent = topic;


    previewTopics.appendChild(span);

  });

}



rows.forEach(row => {

  row.addEventListener(
    "mouseenter",
    () => {

      changePreview(
        row.dataset.preview
      );

    }
  );


  row.addEventListener(
    "focus",
    () => {

      changePreview(
        row.dataset.preview
      );

    }
  );

});



/* ----------------------------------------
   RANDOM DISCOVERY
----------------------------------------- */

const randomButton =
  document.querySelector(
    "#randomButton"
  );


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


randomButton.addEventListener(
  "click",
  () => {

    const page =
      destinations[
        Math.floor(
          Math.random()
          *
          destinations.length
        )
      ];


    window.location.href =
      page;

  }
);



/* ----------------------------------------
   SUBTLE HERO MOVEMENT
----------------------------------------- */

const hero =
  document.querySelector(
    ".hero"
  );


const heroTitle =
  document.querySelector(
    ".hero-title"
  );


if (
  window.matchMedia(
    "(pointer: fine)"
  ).matches
) {

  hero.addEventListener(
    "mousemove",
    event => {

      const rect =
        hero.getBoundingClientRect();


      const x =
        (
          event.clientX
          -
          rect.left
        )
        /
        rect.width
        -
        .5;


      const y =
        (
          event.clientY
          -
          rect.top
        )
        /
        rect.height
        -
        .5;


      heroTitle.style.transform =
        `translate(
          ${x * 10}px,
          ${y * 7}px
        )`;

    }
  );


  hero.addEventListener(
    "mouseleave",
    () => {

      heroTitle.style.transform =
        "translate(0,0)";

    }
  );

}



/* ----------------------------------------
   SCROLL REVEALS
----------------------------------------- */

const revealItems = [

  ...document.querySelectorAll(
    ".section-heading"
  ),

  ...document.querySelectorAll(
    ".about-layout"
  ),

  ...document.querySelectorAll(
    ".explore-layout"
  ),

  ...document.querySelectorAll(
    ".stories-header"
  ),

  ...document.querySelectorAll(
    ".stories-title"
  ),

  ...document.querySelectorAll(
    ".stories-bottom"
  ),

  ...document.querySelectorAll(
    ".discover-content"
  )

];


revealItems.forEach(item => {

  item.setAttribute(
    "data-reveal",
    ""
  );

});


const revealObserver =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (
          entry.isIntersecting
        ) {

          entry.target
            .classList
            .add("visible");


          revealObserver
            .unobserve(
              entry.target
            );

        }

      });

    },

    {
      threshold: .1
    }

  );


revealItems.forEach(item => {

  revealObserver.observe(item);

});
