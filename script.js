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
