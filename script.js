"use strict";

// ─── 1. EDUCATION ACCORDION ─────────────────
document.querySelectorAll(".accordion-card").forEach((card) => {
  card.addEventListener("click", () => {
    const isOpen = card.classList.contains("open");
    // close all first
    document.querySelectorAll(".accordion-card").forEach((c) => {
      c.classList.remove("open");
    });
    // open clicked one if it was closed
    if (!isOpen) {
      card.classList.add("open");
    }
  });
});

// ─── 2. TYPED ROLE ANIMATION ─────────────────
const roles = [
  "AI/ML Engineer",
  "LLM Systems Builder",
  "MLOps Architect",
  "RAG Pipeline Developer",
  "Backend AI Engineer",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById("typed-role");

function typeRole() {
  if (!typedEl) return;
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    charIndex++;
    typedEl.textContent = currentRole.slice(0, charIndex);
    if (charIndex === currentRole.length) {
      setTimeout(() => {
        isDeleting = true;
        typeRole();
      }, 2200);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = currentRole.slice(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeRole, isDeleting ? 45 : 80);
}
typeRole();

// ─── 3. NAVBAR SCROLL EFFECT ─────────────────
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);

  const sections = document.querySelectorAll("section[id]");
  let current = "";
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute("id");
  });
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`,
    );
  });
});

// ─── 4. SMOOTH SCROLL ────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ─── 5. SCROLL REVEAL ────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 120);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
);

document
  .querySelectorAll(
    ".exp-card, .edu-card, .proj-card, .project-hero-card, [data-aos]",
  )
  .forEach((el) => {
    observer.observe(el);
  });

// ─── 6. CONTACT FORM VALIDATION ──────────────
const form = document.getElementById("contact-form");
if (form) {
  const validators = {
    name: {
      el: document.getElementById("name"),
      errEl: document.getElementById("name-error"),
      validate(val) {
        if (!val.trim()) return "Name is required.";
        if (val.trim().length < 2) return "Name must be at least 2 characters.";
        return "";
      },
    },
    email: {
      el: document.getElementById("email"),
      errEl: document.getElementById("email-error"),
      validate(val) {
        if (!val.trim()) return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
          return "Please enter a valid email.";
        return "";
      },
    },
    message: {
      el: document.getElementById("message"),
      errEl: document.getElementById("message-error"),
      validate(val) {
        if (!val.trim()) return "Message is required.";
        if (val.trim().length < 10)
          return "Message must be at least 10 characters.";
        return "";
      },
    },
  };

  Object.values(validators).forEach(({ el, errEl, validate }) => {
    el.addEventListener("blur", () => {
      const err = validate(el.value);
      errEl.textContent = err;
      el.classList.toggle("error", !!err);
    });
    el.addEventListener("input", () => {
      if (el.classList.contains("error")) {
        const err = validate(el.value);
        errEl.textContent = err;
        el.classList.toggle("error", !!err);
      }
    });
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let valid = true;
    Object.values(validators).forEach(({ el, errEl, validate }) => {
      const err = validate(el.value);
      errEl.textContent = err;
      el.classList.toggle("error", !!err);
      if (err) valid = false;
    });
    if (!valid) return;

    const btnText = form.querySelector(".btn-text");
    const btnLoading = form.querySelector(".btn-loading");
    const successEl = document.getElementById("form-success");
    const submitBtn = form.querySelector(".btn-submit");

    btnText.style.display = "none";
    btnLoading.style.display = "inline-flex";
    submitBtn.disabled = true;

    await new Promise((r) => setTimeout(r, 1500));

    form.reset();
    Object.values(validators).forEach(({ el, errEl }) => {
      el.classList.remove("error");
      errEl.textContent = "";
    });
    btnText.style.display = "inline-flex";
    btnLoading.style.display = "none";
    submitBtn.disabled = false;
    successEl.style.display = "block";
    setTimeout(() => {
      successEl.style.display = "none";
    }, 5000);
  });
}

// ─── 7. CONSOLE EASTER EGG ───────────────────
console.log(
  "%cKanishka Kopperla | AI Engineer\n%cmsdkanish76@gmail.com",
  "color: #E50914; font-size: 16px; font-weight: bold;",
  "color: #b3b3b3; font-size: 12px;",
);
