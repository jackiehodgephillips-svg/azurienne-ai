(function () {
  "use strict";

  /* Mobile nav */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* Smooth scroll for same-page anchors (fallback if CSS unsupported) */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* Scorecard multi-step (only on scorecard page) */
  var panelContact = document.getElementById("panel-contact");
  if (!panelContact) return;

  var panelQuestions = document.getElementById("panel-questions");
  var panelBig5 = document.getElementById("panel-big5");
  var panelResults = document.getElementById("panel-results");
  var progressBar = document.getElementById("progress-bar");
  var progressLabel = document.getElementById("progress-label");
  var progressRegion = document.querySelector(".progress");
  var stepTitle = document.getElementById("step-title");
  var stepLead = document.getElementById("step-lead");
  var demoBanner = document.getElementById("demo-banner");
  var state = { name: "", answers: {} };

  var steps = {
    1: {
      title: "Let’s start with you",
      lead: "A few details so we can tailor your readout. Then 12 best-practice questions and 5 qualifying prompts.",
      label: "Step 1 of 4 — Contact",
      pct: 10,
    },
    2: {
      title: "Best-practice diagnostic",
      lead: "Rate how true each statement is for your operation today. Honest answers give a sharper score.",
      label: "Step 2 of 4 — 12 questions",
      pct: 40,
    },
    3: {
      title: "The Big 5",
      lead: "These qualifying questions help us understand your context — situation, outcome, obstacle, and preferred solution.",
      label: "Step 3 of 4 — Qualifying",
      pct: 75,
    },
    4: {
      title: "Your sample results",
      lead: "Illustrative readout for this test site. A live version would personalize scores from your answers.",
      label: "Step 4 of 4 — Results",
      pct: 100,
    },
  };

  function showPanel(step) {
    panelContact.classList.add("hidden");
    panelQuestions.classList.add("hidden");
    panelBig5.classList.add("hidden");
    panelResults.classList.add("hidden");
    if (demoBanner) demoBanner.classList.add("hidden");

    if (step === 1) panelContact.classList.remove("hidden");
    if (step === 2) panelQuestions.classList.remove("hidden");
    if (step === 3) panelBig5.classList.remove("hidden");
    if (step === 4) {
      panelResults.classList.remove("hidden");
      if (demoBanner) demoBanner.classList.remove("hidden");
    }

    var meta = steps[step];
    if (stepTitle) stepTitle.textContent = meta.title;
    if (stepLead) stepLead.textContent = meta.lead;
    if (progressLabel) progressLabel.textContent = meta.label;
    if (progressBar) progressBar.style.width = meta.pct + "%";
    if (progressRegion) progressRegion.setAttribute("aria-valuenow", String(meta.pct));

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function computeSampleScore() {
    var total = 0;
    var count = 0;
    var util = 0;
    var ops = 0;
    var rev = 0;
    var i;
    for (i = 1; i <= 12; i++) {
      var val = parseInt(state.answers["q" + i], 10);
      if (!val) continue;
      total += val;
      count++;
      if (i <= 3) util += val;
      else if (i <= 7) ops += val;
      else rev += val;
    }
    if (!count) {
      return { overall: 68, util: 62, ops: 74, rev: 58 };
    }
    var overall = Math.round((total / (count * 5)) * 100);
    var utilScore = Math.round((util / 15) * 100);
    var opsScore = Math.round((ops / 20) * 100);
    var revScore = Math.round((rev / 25) * 100);
    return { overall: overall, util: utilScore, ops: opsScore, rev: revScore };
  }

  function bandFor(score) {
    if (score >= 85) return "Advanced — AI-ready operating system";
    if (score >= 70) return "Strong — refine the weak spots";
    if (score >= 55) return "Developing — solid foundation, clear gaps";
    if (score >= 40) return "Early — high leverage from basics";
    return "Fragile — prioritize systems before scale";
  }

  function renderResults() {
    var scores = computeSampleScore();
    var greeting = document.getElementById("results-greeting");
    var scoreValue = document.getElementById("score-value");
    var scoreBand = document.getElementById("score-band");
    var leverUtil = document.getElementById("lever-util");
    var leverOps = document.getElementById("lever-ops");
    var leverRev = document.getElementById("lever-rev");
    var bars = document.querySelectorAll(".lever-bar span");

    if (greeting) {
      greeting.textContent = state.name
        ? state.name.split(" ")[0] + ", here’s your sample readout"
        : "Here’s your sample readout";
    }
    if (scoreValue) scoreValue.textContent = String(scores.overall);
    if (scoreBand) scoreBand.textContent = bandFor(scores.overall);
    if (leverUtil) leverUtil.textContent = String(scores.util);
    if (leverOps) leverOps.textContent = String(scores.ops);
    if (leverRev) leverRev.textContent = String(scores.rev);

    if (bars[0]) bars[0].style.width = scores.util + "%";
    if (bars[1]) bars[1].style.width = scores.ops + "%";
    if (bars[2]) bars[2].style.width = scores.rev + "%";

    var ring = document.querySelector(".score-ring");
    if (ring) {
      ring.style.background =
        "conic-gradient(var(--azure) 0 " + scores.overall + "%, rgba(11, 31, 51, 0.1) 0)";
    }
  }

  panelContact.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!panelContact.checkValidity()) {
      panelContact.reportValidity();
      return;
    }
    state.name = document.getElementById("fullName").value.trim();
    state.email = document.getElementById("email").value.trim();
    state.role = document.getElementById("role").value;
    state.vessel = document.getElementById("vessel").value.trim();
    showPanel(2);
  });

  panelQuestions.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!panelQuestions.checkValidity()) {
      panelQuestions.reportValidity();
      return;
    }
    var i;
    for (i = 1; i <= 12; i++) {
      var checked = panelQuestions.querySelector('input[name="q' + i + '"]:checked');
      state.answers["q" + i] = checked ? checked.value : null;
    }
    showPanel(3);
  });

  panelBig5.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!panelBig5.checkValidity()) {
      panelBig5.reportValidity();
      return;
    }
    state.situation = document.getElementById("big5-situation").value.trim();
    state.outcome = document.getElementById("big5-outcome").value.trim();
    state.obstacle = document.getElementById("big5-obstacle").value.trim();
    state.solution = document.getElementById("big5-solution").value;
    state.open = document.getElementById("big5-open").value.trim();
    renderResults();
    showPanel(4);
  });

  var backContact = document.getElementById("back-to-contact");
  var backQuestions = document.getElementById("back-to-questions");
  if (backContact) {
    backContact.addEventListener("click", function () {
      showPanel(1);
    });
  }
  if (backQuestions) {
    backQuestions.addEventListener("click", function () {
      showPanel(2);
    });
  }

  showPanel(1);
})();
