/* =========================================================
   $CHIMP — production script
   ========================================================= */
(function () {
  "use strict";

  /* ---- nav shadow on scroll ---- */
  var nav = document.getElementById("siteNav");
  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- mobile menu ---- */
  var menuBtn = document.getElementById("menuBtn");
  var mobilePanel = document.getElementById("mobilePanel");

  function closeMenu() {
    mobilePanel.classList.remove("open");
    menuBtn.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }
  function openMenu() {
    mobilePanel.classList.add("open");
    menuBtn.classList.add("is-open");
    menuBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }
  menuBtn.addEventListener("click", function () {
    mobilePanel.classList.contains("open") ? closeMenu() : openMenu();
  });
  mobilePanel.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  /* ---- copy contract address placeholder ---- */
  var copyBtn = document.getElementById("copyBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      copyBtn.textContent = "Not live yet";
      setTimeout(function () {
        copyBtn.textContent = "Copy";
      }, 1600);
    });
  }

  /* ---- reduced motion / mascot animation ---- */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mascotFrame = document.getElementById("mascotFrame");
  var mascotTilt = document.getElementById("mascotTilt");

  if (reduceMotion) {
    if (mascotFrame) mascotFrame.classList.remove("animate");
  } else if (mascotTilt) {
    var stage = document.getElementById("heroStage");
    var isFinePointer = window.matchMedia("(pointer:fine)").matches;
    if (isFinePointer && stage) {
      var raf = null;
      stage.addEventListener("mousemove", function (e) {
        var rect = stage.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          mascotTilt.style.transform = "rotateY(" + x * 10 + "deg) rotateX(" + -y * 10 + "deg)";
        });
      });
      stage.addEventListener("mouseleave", function () {
        mascotTilt.style.transform = "";
      });
    }
  }

  /* ---- support widget (static FAQ, no real backend — answers are canned) ---- */
  var supportFab = document.getElementById("supportFab");
  var supportNavBtn = document.getElementById("supportNavBtn");
  var supportMobileBtn = document.getElementById("supportMobileBtn");
  var supportPanel = document.getElementById("supportPanel");
  var supportClose = document.getElementById("supportClose");
  var supportBody = document.getElementById("supportBody");

  var FAQ = [
    {
      q: "What is $CHIMP?",
      a: "$CHIMP is a meme coin about a very confident chimpanzee. No brains, no promises — just vibes and a community that likes a good bit."
    },
    {
      q: "Where do I buy $CHIMP?",
      a: 'You can buy $CHIMP on pump.fun. <a href="https://pump.fun/join/unlikesalmon140" target="_blank" rel="noopener noreferrer">Open pump.fun ↗</a>'
    },
    {
      q: "Is there a contract address yet?",
      a: "Not yet — it will be posted right here on the site and in the Telegram the moment it's live. Never trust a CA from anywhere else."
    },
    {
      q: "How do I join the community?",
      a: 'Jump into the Telegram — that\'s where everything happens. <a href="https://t.me/chimpbuytld" target="_blank" rel="noopener noreferrer">Open Telegram ↗</a>'
    },
    {
      q: "Is this financial advice?",
      a: "No. $CHIMP has no guaranteed value or utility and no promise of profit. Always do your own research."
    }
  ];

  function buildSupportBody() {
    if (!supportBody) return;
    supportBody.innerHTML = "";

    var intro = document.createElement("div");
    intro.className = "support-msg";
    intro.textContent = "Hey, I'm Chimp Support. Pick a question below \u2014 instant answers, no brains required.";
    supportBody.appendChild(intro);

    FAQ.forEach(function (item) {
      var qBtn = document.createElement("button");
      qBtn.type = "button";
      qBtn.className = "support-q";
      qBtn.textContent = item.q;
      qBtn.addEventListener("click", function () {
        if (qBtn.disabled) return;
        qBtn.disabled = true;
        var ansEl = document.createElement("div");
        ansEl.className = "support-msg";
        ansEl.innerHTML = item.a;
        supportBody.appendChild(ansEl);
        supportBody.scrollTop = supportBody.scrollHeight;
      });
      supportBody.appendChild(qBtn);
    });
  }

  function openSupport() {
    if (!supportPanel) return;
    supportPanel.classList.add("open");
    supportPanel.setAttribute("aria-hidden", "false");
  }
  function closeSupport() {
    if (!supportPanel) return;
    supportPanel.classList.remove("open");
    supportPanel.setAttribute("aria-hidden", "true");
  }
  function toggleSupport() {
    if (!supportPanel) return;
    supportPanel.classList.contains("open") ? closeSupport() : openSupport();
  }

  if (supportPanel) {
    buildSupportBody();
    if (supportFab) supportFab.addEventListener("click", toggleSupport);
    if (supportNavBtn) supportNavBtn.addEventListener("click", openSupport);
    if (supportMobileBtn) {
      supportMobileBtn.addEventListener("click", function () {
        closeMenu();
        openSupport();
      });
    }
    if (supportClose) supportClose.addEventListener("click", closeSupport);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeSupport();
    });
  }
})();
