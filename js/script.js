document.addEventListener("DOMContentLoaded", () => {
  // 1. MOBİL MENÜ
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".menu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
    document.querySelectorAll(".menu li a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // 2. RENK DEĞİŞTİREN (CHAMELEON) GÖZLEMCİ
  const sectionsWithColor = document.querySelectorAll(
    ".page-section[data-color]"
  );
  const themeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const newColor = entry.target.getAttribute("data-color");
          const newGlow = entry.target.getAttribute("data-glow");
          document.documentElement.style.setProperty(
            "--accent-color",
            newColor
          );
          document.documentElement.style.setProperty("--glow-color", newGlow);
        }
      });
    },
    { threshold: 0.3 }
  ); // %30 görünce renk değişsin

  sectionsWithColor.forEach((s) => themeObserver.observe(s));

  // 3. SCROLL SPY (MENÜ AKTİFLİĞİ)
  const sections = document.querySelectorAll(".page-section");
  const navLinks = document.querySelectorAll(".menu li a");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  // 4. SPOTLIGHT EFEKTİ (MOUSE TAKİBİ)
  const cardsWrapper = document.getElementById("cards");
  const cards = document.querySelectorAll(".card");
  if (cardsWrapper) {
    cardsWrapper.onmousemove = (e) => {
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };
  }

  // 5. TYPEWRITER (DAKTİLO)
  const textElement = document.querySelector(".typewriter");
  if (textElement) {
    const texts = [
      "Dionysos",
      "Developer",
      "Tech Enthusiast",
      "Lifelong Learner",
    ];
    let count = 0,
      index = 0,
      currentText = "",
      letter = "";
    (function type() {
      if (count === texts.length) count = 0;
      currentText = texts[count];
      letter = currentText.slice(0, ++index);
      textElement.textContent = letter;
      if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(type, 2000);
      } else {
        setTimeout(type, 50);
      }
    })();
  }

  // 6. TERMİNAL (CLI)
  const termToggle = document.querySelector(".terminal-toggle");
  const termOverlay = document.getElementById("terminalOverlay");
  const termClose = document.getElementById("closeTerminal");
  const termInput = document.getElementById("terminalInput");
  const termOutput = document.querySelector(".output");

  if (termToggle) {
    termToggle.addEventListener("click", () => {
      termOverlay.classList.add("active");
      termInput.focus();
    });
    termClose.addEventListener("click", () =>
      termOverlay.classList.remove("active")
    );
    termOverlay.addEventListener("click", (e) => {
      if (e.target === termOverlay) termOverlay.classList.remove("active");
    });

    termInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const cmd = termInput.value.trim().toLowerCase();
        printLine(`user@dionysos:~$ ${cmd}`, "#ccc");
        switch (cmd) {
          case "help":
            printLine("Commands: help, whoami, github, contact, clear");
            break;
          case "whoami":
            printLine("Sarp Mataş | Computer Engineer | Dionysos");
            break;
          case "github":
            window.open("https://github.com/Dionysos22", "_blank");
            break;
          case "contact":
            window.location.href = "#contact";
            termOverlay.classList.remove("active");
            break;
          case "clear":
            termOutput.innerHTML = "";
            break;
          default:
            printLine(`Error: ${cmd} not found.`, "#ef4444");
        }
        termInput.value = "";
        document.getElementById("terminalBody").scrollTop =
          document.getElementById("terminalBody").scrollHeight;
      }
    });
  }
  function printLine(text, color = "#0f0") {
    const p = document.createElement("p");
    p.textContent = text;
    p.style.color = color;
    p.style.margin = "5px 0";
    termOutput.appendChild(p);
  }
});
