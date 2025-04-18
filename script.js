'use strict';

/**
 * Add event listener on multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
  if (elements) { // Check if elements exist
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener(eventType, callback);
    }
  }
}

/**
 * Mobile Navbar Toggle
 */
const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
  document.body.classList.toggle("nav-active"); // Use a specific class for body lock
}

if (navToggler) { // Check if toggler exists before adding event
    addEventOnElements([navToggler], "click", toggleNavbar);
}

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  document.body.classList.remove("nav-active");
}

if (navbarLinks) { // Check if links exist
    addEventOnElements(navbarLinks, "click", closeNavbar);
}


/**
 * Header scroll behavior
 */
const header = document.querySelector("[data-header]");
let lastScrollY = window.scrollY;

const handleHeaderScroll = function () {
  if (lastScrollY < window.scrollY && window.scrollY > 150) {
    // Scrolling down and past a certain point
    header.classList.add("hide");
  } else {
    // Scrolling up or near the top
    header.classList.remove("hide");
  }

  if (window.scrollY > 50) {
    header.classList.add("active"); // Add background/shadow when scrolled
  } else {
    header.classList.remove("active");
  }

  lastScrollY = window.scrollY;
}

if (header) { // Check if header exists
    window.addEventListener("scroll", handleHeaderScroll);
}


/**
 * Add active class to the current page's nav link
 */
const highlightActiveNavLink = function () {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html'; // Get current file name
    const navLinks = document.querySelectorAll('.navbar-link[data-nav-link]'); // Ensure they are actual links

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();

        // Handle root path ('/' or 'index.html')
        const isIndex = currentPath === 'index.html' || currentPath === '';
        const linkIsIndex = linkPath === 'index.html' || linkPath === './' || linkPath === '/';

        if ((isIndex && linkIsIndex) || (linkPath !== '' && currentPath === linkPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', highlightActiveNavLink);


/**
 * Tab Functionality (Example for Market Section)
 */
const tabBtns = document.querySelectorAll(".market-tab .tab-btn"); // Scope to market tabs
const tabContents = document.querySelectorAll(".market-tab .tab-content"); // Scope to market content

if (tabBtns.length > 0 && tabContents.length > 0) { // Check if tabs exist
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab; // Expect data-tab="content-id" on buttons

            // Deactivate all buttons and content panels within this tab group
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Activate the clicked button
            this.classList.add('active');

            // Activate the corresponding content panel
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            } else {
                // Fallback: If no ID match, activate the first content panel
                // Or handle error - for now, activate first matching panel if found
                if (tabContents[0]) tabContents[0].classList.add('active');
                 console.warn(`Tab content with ID "${tabId}" not found.`);
            }
        });
    });

    // Optional: Activate the first tab by default if none are marked active in HTML
    const isActiveTabPresent = document.querySelector(".market-tab .tab-btn.active");
    if (!isActiveTabPresent && tabBtns[0]) {
        tabBtns[0].click(); // Simulate click on the first button
    }
}

/**
 * Toggle 'active' class on 'Add to Fav' buttons (Visual Only)
 */
const addToFavBtns = document.querySelectorAll("[data-add-to-fav]");

const toggleActiveFav = function () {
  this.classList.toggle("active");
}

if (addToFavBtns) { // Check if buttons exist
    addEventOnElements(addToFavBtns, "click", toggleActiveFav);
}


/**
 * Scroll Reveal Effect
 */
const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
    if (!sections) return; // Exit if no sections found

    for (let i = 0; i < sections.length; i++) {
        // Add revealed class initially to apply start state (opacity 0, transform)
        if (!sections[i].classList.contains('revealed')) {
            sections[i].classList.add('revealed');
        }

        // Check if section is in viewport
        if (sections[i].getBoundingClientRect().top < window.innerHeight / 1.2) { // Adjust trigger point
            sections[i].classList.add("active");
        }
        // Optional: Remove active class when scrolling up out of view
        // else {
        //   sections[i].classList.remove("active");
        // }
    }
}

// Initial check on load
scrollReveal();

// Add event listener for scroll
window.addEventListener("scroll", scrollReveal);

console.log("CryptoX Script Loaded");
