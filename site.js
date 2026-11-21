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

    // Whole-page toggles (like the tariffs article) also switch the page's language,
    // tab title, and nav links, then jump back to the top of the article.
    // LEARN: data-* attributes let the HTML hold the settings, so this code stays generic.
    if (button.dataset.page !== undefined) {
      var french = !showingFrench;
      document.documentElement.lang = french ? "fr" : "en";
      if (button.dataset.titleFr) document.title = french ? button.dataset.titleFr : button.dataset.titleEn;
      document.querySelectorAll("[data-fr-href]").forEach(function (link) {
        if (!link.dataset.enHref) link.dataset.enHref = link.getAttribute("href");
        link.setAttribute("href", french ? link.dataset.frHref : link.dataset.enHref);
      });
      // Remember the choice in the address bar (#fr), so a shared link opens in French.
      if (history.replaceState) history.replaceState(null, "", french ? "#fr" : location.pathname);
      if (!button.dataset.quiet) button.scrollIntoView({ block: "start" });
    }
  });

  // Open in French straight away if the link asks for it (#fr, or a French section like #sources-fr).
  if (button.dataset.page !== undefined && /^#(fr|.+-fr)$/.test(location.hash)) {
    var hash = location.hash;
    button.dataset.quiet = "1";
    button.click();
    delete button.dataset.quiet;
    if (hash !== "#fr") {
      history.replaceState(null, "", hash);
      var target = document.getElementById(hash.slice(1));
      if (target) {
        // "instant" skips the smooth glide, which can land short while pictures above are still loading.
        target.scrollIntoView({ behavior: "instant" });
        window.addEventListener("load", function () { target.scrollIntoView({ behavior: "instant" }); });
      }
    }
  }
});
  

/* EXTERNAL LINKS OPEN IN A NEW TAB
   LEARN: a link's hostname is the website it points to. If it isn't this site,
   open it in a new tab so the reader doesn't lose their place here.
   rel="noopener" stops the other site from controlling this tab, and
   "noreferrer" keeps it from seeing which page sent the visitor.
   Because this runs on every page, new links get the behavior automatically. */
document.querySelectorAll("a[href]").forEach(function (link) {
  if (link.hostname && link.hostname !== location.hostname) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    if (!link.querySelector(".new-tab")) {
      // A hidden note for screen readers, so the new tab isn't a surprise.
      var note = document.createElement("span");
      note.className = "new-tab";
      note.textContent = link.closest('[lang="fr"]') ? " (s\u2019ouvre dans un nouvel onglet)" : " (opens in a new tab)";
      link.appendChild(note);
    }
  }
});
