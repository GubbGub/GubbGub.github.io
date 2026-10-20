/* Shared behavior for every page: the light/dark toggle and the French toggle.
   LEARN: it is loaded at the very end of each page, so every button already exists when it runs. */
/* LIGHT / DARK TOGGLE
   LEARN: localStorage is a small box of saved settings in the visitor's browser.
   It remembers their choice next time they visit. try/catch keeps the toggle working
   even in private browsing, where saving can be blocked. */
(function () {
  var root = document.documentElement;
  var button = document.querySelector(".theme-toggle");

  function label() {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    button.setAttribute("aria-label", "Switch to " + next + " mode");
    button.title = "Switch to " + next + " mode";
  }

  button.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    label();
  });

  // If they never picked, keep following the device when it switches (for example at sunset).
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    var saved = null;
    try { saved = localStorage.getItem("theme"); } catch (err) {}
    if (!saved) { root.setAttribute("data-theme", e.matches ? "dark" : "light"); label(); }
  });

  label();
})();

/* FRENCH TOGGLE */
document.querySelectorAll(".lang-toggle").forEach(function (button) {
  button.addEventListener("click", function () {
    var block = document.getElementById(button.dataset.target);
    var showingFrench = button.getAttribute("aria-pressed") === "true";

    block.querySelector('[data-lang="en"]').hidden = !showingFrench;
    block.querySelector('[data-lang="fr"]').hidden = showingFrench;

    button.setAttribute("aria-pressed", String(!showingFrench));
    button.textContent = showingFrench ? "Lire en français" : "Read in English";
  });
});
  
