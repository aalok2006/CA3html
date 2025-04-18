'use strict';

/**
 * Add event listener on multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
  if (elements) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener(eventType, callback);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  /**
   * Mobile Navbar Toggle
   */
  const navbar = document.querySelector("[data-navbar]");
  const navToggler = document.querySelector("[data-nav-toggler]");
  const navbarLinks = document.querySelectorAll("[data-nav-link]");

  const toggleNavbar = function () {
    navbar?.classList.toggle("active");
    navToggler?.classList.toggle("active");
    document.body.classList.toggle("nav-active");
  };

  navToggler && addEventOnElements([navToggler], "click", toggleNavbar);

  const closeNavbar = function () {
    navbar?.classList.remove("active");
    navToggler?.classList.remove("active");
    document.body.classList.remove("nav-active");
  };

  navbarLinks && addEventOnElements(navbarLinks, "click", closeNavbar);

  /**
   * Header scroll behavior
   */
  const header = document.querySelector("[data-header]");
  let lastScrollY = window.scrollY;

  const handleHeaderScroll = function () {
    if (!header) return;

    if (lastScrollY < window.scrollY && window.scrollY > 150) {
      header.classList.add("hide");
    } else {
      header.classList.remove("hide");
    }

    if (window.scrollY > 50) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }

    lastScrollY = window.scrollY;
  };

  header && window.addEventListener("scroll", handleHeaderScroll);

  /**
   * Highlight active nav link
   */
  const highlightActiveNavLink = function () {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-link[data-nav-link]');

    navLinks.forEach(link => {
      const linkPath = link.getAttribute('href').split('/').pop();

      const isIndex = currentPath === 'index.html' || currentPath === '';
      const linkIsIndex = linkPath === 'index.html' || linkPath === './' || linkPath === '/';

      if ((isIndex && linkIsIndex) || (linkPath !== '' && currentPath === linkPath)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  highlightActiveNavLink();

  /**
   * Tab Functionality (Market Section)
   */
  const tabBtns = document.querySelectorAll(".market-tab .tab-btn");
  const tabContents = document.querySelectorAll(".market-tab .tab-content");

  if (tabBtns.length > 0 && tabContents.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const tabId = this.dataset.tab;

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        this.classList.add('active');

        const targetContent = document.getElementById(tabId);
        if (targetContent) {
          targetContent.classList.add('active');
        } else {
          if (tabContents[0]) tabContents[0].classList.add('active');
          console.warn(`Tab content with ID "${tabId}" not found.`);
        }
      });
    });

    const isActiveTabPresent = document.querySelector(".market-tab .tab-btn.active");
    if (!isActiveTabPresent && tabBtns[0]) {
      tabBtns[0].click();
    }
  }

  /**
   * Toggle 'active' class on 'Add to Fav' buttons
   */
  const addToFavBtns = document.querySelectorAll("[data-add-to-fav]");

  const toggleActiveFav = function () {
    this.classList.toggle("active");
  };

  addToFavBtns && addEventOnElements(addToFavBtns, "click", toggleActiveFav);

  /**
   * Scroll Reveal
   */
  const sections = document.querySelectorAll("[data-section]");

  const scrollReveal = function () {
    if (!sections) return;

    for (let i = 0; i < sections.length; i++) {
      if (!sections[i].classList.contains('revealed')) {
        sections[i].classList.add('revealed');
      }

      if (sections[i].getBoundingClientRect().top < window.innerHeight / 1.2) {
        sections[i].classList.add("active");
      }
    }
  };

  scrollReveal();
  window.addEventListener("scroll", scrollReveal);
});
