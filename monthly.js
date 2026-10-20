/*
  Turns the entries in monthly-data.js into HTML.

  The homepage has two empty boxes, <div id="field-notes"> and <div id="portrait">,
  and this script fills them with the newest month. The archive page has
  <div id="archive">, which gets every month.

  LEARN: building HTML from data is called "rendering". Frameworks like React do this
  at a bigger scale, but the idea is the same: data in, HTML out.
*/
(function () {
  var months = window.MONTHLY || [];

  // LEARN: esc() makes text safe to put inside HTML. Without it, a "<" in your notes
  // would be read as the start of a tag and could break the page.
  function esc(text) {
    return String(text)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function list(items) {
    return items.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
  }

  function sources(items) {
    if (!items || !items.length) return "";
    return '<p class="sources"><span class="tag">Sources</span> ' +
      items.map(function (s) {
        return '<a href="' + esc(s[1]) + '" target="_blank" rel="noopener">' + esc(s[0]) + "</a>";
      }).join(" · ") + "</p>";
  }

  // The month's accent color travels as two CSS variables; style.css picks the right one for the theme.
  function accentStyle(m) {
    return 'style="--month-light:' + esc(m.accent.light) + ";--month-dark:" + esc(m.accent.dark) + '"';
  }

  function fieldNotes(m) {
    var a = m.animal;
    var art = a.image
      ? '<img src="' + esc(a.image) + '" alt="' + esc(a.imageAlt) + '">'
      : '<div class="figure" role="img" aria-label="Placeholder for the ' + esc(a.english) + ' drawing">your drawing goes here</div>';

    return '' +
      '<article class="card field-notes monthly" ' + accentStyle(m) + '>' +
        '<div class="fn-head">' +
          '<div class="fn-art">' + art + '</div>' +
          '<div class="fn-title">' +
            '<span class="tag">Field notes · ' + esc(m.label) + '</span>' +
            '<p class="specimen">Specimen ' + String(a.number).padStart(2, "0") + '</p>' +
            '<h3 lang="fr">' + esc(a.french) + '</h3>' +
            '<p class="fn-names"><em>' + esc(a.scientific) + '</em> · ' + esc(a.english) + ', ' + esc(a.nickname) + '</p>' +
            '<p class="fn-status">' + esc(a.status) + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="fn-cols">' +
          '<section><h4 class="tag">Biology</h4>' + list(a.biology) + '</section>' +
          '<section><h4 class="tag">Behavior &amp; research</h4>' + list(a.behavior) + '</section>' +
          '<section lang="fr"><h4 class="tag">Langue</h4>' +
            '<dl class="vocab">' + a.vocab.map(function (v) {
              return '<div><dt>' + esc(v[0]) + '</dt><dd lang="en">' + esc(v[1]) + '</dd></div>';
            }).join("") + '</dl>' +
            '<p class="fr-sentence">' + esc(a.sentence.fr) + '<span lang="en">' + esc(a.sentence.en) + '</span></p>' +
          '</section>' +
        '</div>' +
        '<div class="fn-question"><span class="tag">Open question</span><p>' + esc(a.question) + '</p></div>' +
        sources(a.sources) +
      '</article>';
  }

  function portrait(m) {
    var p = m.person;
    return '' +
      '<article class="card portrait">' +
        '<span class="tag">Portrait · ' + esc(m.label) + '</span>' +
        '<h3>' + esc(p.name) + '</h3>' +
        '<p class="pt-meta">' + esc(p.years) + ' · ' + esc(p.role) + '</p>' +
        '<dl class="note"><dt class="tag">The big idea</dt><dd>' + esc(p.figured) + '</dd></dl>' +
        '<dl class="note"><dt class="tag">Before that</dt><dd>' + esc(p.before) + '</dd></dl>' +
        '<dl class="note"><dt class="tag">Why the name isn\'t famous</dt><dd>' + esc(p.unknown) + '</dd></dl>' +
        '<dl class="note"><dt class="tag">Where it shows up in my work</dt><dd>' + esc(p.mine) + '</dd></dl>' +
        sources(p.sources) +
      '</article>';
  }

  // A small summary card for the archive page.
  function archiveCard(m) {
    var a = m.animal, p = m.person;
    return '' +
      '<article class="card archive-month monthly" id="' + esc(m.id) + '" ' + accentStyle(m) + '>' +
        '<h2>' + esc(m.label) + '</h2>' +
        '<div class="archive-grid">' +
          '<div><span class="tag">Field notes</span><h3 lang="fr">' + esc(a.french) + '</h3>' +
            '<p><em>' + esc(a.scientific) + '</em> · ' + esc(a.english) + '</p>' +
            '<p class="archive-q">' + esc(a.question) + '</p></div>' +
          '<div><span class="tag">Portrait</span><h3>' + esc(p.name) + '</h3>' +
            '<p>' + esc(p.years) + ' · ' + esc(p.role) + '</p>' +
            '<p class="archive-q">' + esc(p.figured) + '</p></div>' +
        '</div>' +
        '<details><summary>Read the full notes</summary>' + fieldNotes(m) + portrait(m) + '</details>' +
      '</article>';
  }

  var fn = document.getElementById("field-notes");
  var pt = document.getElementById("portrait");
  var ar = document.getElementById("archive");

  if (months.length) {
    if (fn) fn.innerHTML = fieldNotes(months[0]);
    if (pt) pt.innerHTML = portrait(months[0]);
    if (ar) ar.innerHTML = months.map(archiveCard).join("");
  }
})();
