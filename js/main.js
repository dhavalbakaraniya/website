/**
 * ============================================================
 * MAIN.JS - Portfolio Interactive Features
 * ============================================================
 * Handles:
 * 1. Language toggle (EN/DE)
 * 2. Mobile hamburger menu
 * 3. Navbar scroll effect
 * 4. Smooth scroll for anchor links
 * 5. Contact form submission (Formspree)
 * 6. Scroll-triggered animations
 * 7. Dynamic year in footer
 * ============================================================
 */

// ==================== LANGUAGE TOGGLE ====================
let currentLang = "en";

function switchLanguage(lang) {
  currentLang = lang;

  // Update all elements with data-en / data-de attributes
  document.querySelectorAll("[data-en]").forEach((el) => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      // Use innerHTML for elements that contain HTML (like <span> tags)
      if (text.includes("<")) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    }
  });

  // Update placeholders
  document.querySelectorAll(`[data-${lang}-placeholder]`).forEach((el) => {
    el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
  });

  // Update active state on all toggle buttons
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang;
}

// Add click listeners to all language buttons
document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => switchLanguage(btn.dataset.lang));
});

// ==================== MOBILE MENU ====================
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  const icon = mobileMenuBtn.querySelector("i");
  if (mobileMenu.classList.contains("open")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    const icon = mobileMenuBtn.querySelector("i");
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  });
});

// ==================== NAVBAR SCROLL EFFECT ====================
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ==================== CONTACT FORM (Formspree) ====================
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = contactForm.querySelector(".btn-submit");
  const originalHTML = submitBtn.innerHTML;

  // Show loading state
  submitBtn.innerHTML =
    '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>';
  submitBtn.disabled = true;

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      // Show success message
      formSuccess.classList.add("show");
      contactForm.reset();

      // Hide success after 5 seconds
      setTimeout(() => {
        formSuccess.classList.remove("show");
      }, 5000);
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    alert("Network error. Please check your connection.");
  }

  submitBtn.innerHTML = originalHTML;
  submitBtn.disabled = false;
});

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply initial hidden state and observe all cards and sections
document
  .querySelectorAll(".card, .timeline-item, .section-header")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// ==================== DYNAMIC YEAR ====================
document.getElementById("currentYear").textContent = new Date().getFullYear();
