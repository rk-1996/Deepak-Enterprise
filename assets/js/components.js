
document.addEventListener("DOMContentLoaded", function () {

  loadHeader();
  loadFooter();

});


// =================================
// LOAD REUSABLE HEADER
// =================================

function loadHeader() {

  const headerElement =
    document.getElementById("site-header");

  if (!headerElement) return;

  fetch("components/header.html")

    .then(response => {

      if (!response.ok) {
        throw new Error("Header file not found");
      }

      return response.text();

    })

    .then(data => {

      headerElement.innerHTML = data;

      // IMPORTANT:
      // Initialize hamburger after header loads
      initializeSideMenu();

    })

    .catch(error => {

      console.error("Header loading error:", error);

    });

}


// =================================
// LOAD REUSABLE FOOTER
// =================================

function loadFooter() {

  const footerElement =
    document.getElementById("site-footer");

  if (!footerElement) return;

  fetch("components/footer.html")

    .then(response => {

      if (!response.ok) {
        throw new Error("Footer file not found");
      }

      return response.text();

    })

    .then(data => {

      footerElement.innerHTML = data;

    })

    .catch(error => {

      console.error("Footer loading error:", error);

    });

}


// =================================
// HAMBURGER SIDE MENU
// =================================

function initializeSideMenu() {

  const hamburger =
    document.getElementById("hamburger");

  const sideMenu =
    document.getElementById("sideMenu");

  const overlay =
    document.getElementById("overlay");

  const closeMenu =
    document.getElementById("closeMenu");


  // Check all elements exist

  if (
    !hamburger ||
    !sideMenu ||
    !overlay ||
    !closeMenu
  ) {

    console.error(
      "Side menu elements not found"
    );

    return;

  }


  // OPEN MENU

  function openMenu() {

    sideMenu.classList.add("open");

    overlay.classList.add("show");

    hamburger.classList.add("active");

    document.body.style.overflow = "hidden";

    hamburger.setAttribute(
      "aria-expanded",
      "true"
    );

  }


  // CLOSE MENU

  function hideMenu() {

    sideMenu.classList.remove("open");

    overlay.classList.remove("show");

    hamburger.classList.remove("active");

    document.body.style.overflow = "";

    hamburger.setAttribute(
      "aria-expanded",
      "false"
    );

  }


  // BUTTON EVENTS

  hamburger.addEventListener(
    "click",
    openMenu
  );


  closeMenu.addEventListener(
    "click",
    hideMenu
  );


  overlay.addEventListener(
    "click",
    hideMenu
  );


  // CLOSE WHEN CLICKING A LINK

  sideMenu.querySelectorAll("a").forEach(link => {

    link.addEventListener(
      "click",
      hideMenu
    );

  });


  // CLOSE WITH ESCAPE KEY

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        sideMenu.classList.contains("open")
      ) {

        hideMenu();

      }

    }
  );

}