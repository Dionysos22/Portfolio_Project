/**
 * Student Portfolio Script (FINAL BİRLEŞTİRİLMİŞ VERSİYON)
 * Author: Sarp Mataş
 */

document.addEventListener("DOMContentLoaded", () => {
  // ======================================================
  // 1. MOBİL MENÜ & NAVİGASYON
  // ======================================================
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".menu");

  if (hamburger && navMenu) {
    // Menü aç/kapa
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Linke tıklanınca menüyü kapat
    document.querySelectorAll(".menu li a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // Auto-Active Link (Hangi sayfadaysan o linki yak)
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu li a").forEach((link) => {
    const linkPage = link.getAttribute("href");
    link.classList.remove("active");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  // ======================================================
  // 2. SPOTLIGHT MOUSE EFEKTİ (Kartların üzerindeki ışık)
  // ======================================================
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

  // ======================================================
  // 3. TYPEWRITER EFEKTİ (Ana Sayfa Yazısı)
  // ======================================================
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

  // ======================================================
  // 4. İLETİŞİM FORMU KONTROLÜ
  // ======================================================
  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }
      if (!email.includes("@") || !email.includes(".")) {
        alert("Please enter a valid email address.");
        return;
      }
      alert(`Thanks ${name}! Your message has been received.`);
      contactForm.reset();
    });
  }

  // ======================================================
  // 5. ULTIMATE MODAL SYSTEM (PROJE DETAYLARI)
  // ======================================================

  // A. Önce CSS'i ekleyelim (Eğer yoksa)
  if (!document.getElementById("modal-styles")) {
    const style = document.createElement("style");
    style.id = "modal-styles";
    style.innerHTML = `
            .modal {
                display: none; position: fixed; z-index: 9999; left: 0; top: 0; width: 100%; height: 100%;
                background-color: rgba(0, 0, 0, 0.85); backdrop-filter: blur(5px);
                justify-content: center; align-items: center; opacity: 0; transition: all 0.3s ease; padding: 20px;
            }
            .modal.show { display: flex !important; opacity: 1 !important; }
            .modal-content {
                background: #0f172a; border: 1px solid rgba(255,255,255,0.1); border-top: 2px solid var(--accent-color, #d946ef);
                box-shadow: 0 0 40px rgba(0,0,0,0.5); padding: 0; border-radius: 12px;
                width: 100%; max-width: 600px; max-height: 85vh; display: flex; flex-direction: column;
                transform: scale(0.95); transition: all 0.3s ease; overflow: hidden;
            }
            .modal.show .modal-content { transform: scale(1); }
            .modal-header { padding: 20px; background: rgba(255,255,255,0.03); display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
            .modal-header h2 { margin: 0; color: #fff; font-size: 1.4rem; display: flex; align-items: center; gap: 10px; }
            .close-modal { color: #94a3b8; font-size: 24px; cursor: pointer; } .close-modal:hover { color: #fff; }
            .modal-body { padding: 25px; overflow-y: auto; color: #cbd5e1; font-size: 0.95rem; line-height: 1.6; }
            .modal-footer { padding: 15px 25px; background: rgba(0,0,0,0.2); text-align: right; border-top: 1px solid rgba(255,255,255,0.05); }
            .modal-btn { display: inline-flex; align-items: center; gap: 8px; background: var(--accent-color, #d946ef); color: #000; padding: 8px 20px; border-radius: 6px; font-weight: bold; text-decoration: none; transition: 0.3s; }
            .modal-btn:hover { filter: brightness(1.2); }
            .status-tag { font-size: 0.7rem; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; background: rgba(255,255,255,0.1); color: #fff; }
            .tech-tags { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 15px; }
            .tech-tags span { background: rgba(255,255,255,0.05); padding: 4px 10px; border-radius: 15px; font-size: 0.8rem; color: var(--accent-color); border: 1px solid rgba(255,255,255,0.1); }
        `;
    document.head.appendChild(style);
  }

  // B. HTML Yapısını Oluştur
  if (!document.getElementById("project-modal")) {
    const modalHTML = `
            <div id="project-modal" class="modal">
              <div class="modal-content">
                <div class="modal-header">
                  <h2><span id="m-title">Title</span> <span id="m-status" class="status-tag">Status</span></h2>
                  <span class="close-modal">&times;</span>
                </div>
                <div class="modal-body">
                    <p id="m-desc">Description...</p>
                    <div style="margin-top:20px;">
                        <strong style="color:#fff; font-size:0.9rem;">TECHNOLOGIES:</strong>
                        <div id="m-tech-list" class="tech-tags"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a id="m-link" href="#" target="_blank" class="modal-btn"><i class="fa-brands fa-github"></i> Code</a>
                </div>
              </div>
            </div>`;
    document.body.insertAdjacentHTML("beforeend", modalHTML);
  }

  // C. Tıklama Olaylarını Bağla
  const modal = document.getElementById("project-modal");
  const closeBtn = document.querySelector(".close-modal");
  // ÖNEMLİ: Hem .project-card hem de normal .card'ı kapsayalım ki hata olmasın
  const projectCards = document.querySelectorAll(
    ".project-card, .card[data-title]"
  );

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Verileri Al
      const title = card.getAttribute("data-title") || "Proje";
      const status = card.getAttribute("data-status") || "Belirsiz";
      const desc = card.getAttribute("data-desc") || "Açıklama yok.";
      const tech = card.getAttribute("data-tech") || "";
      const link = card.getAttribute("data-link") || "#";

      // Verileri Yerleştir
      document.getElementById("m-title").innerText = title;
      document.getElementById("m-status").innerText = status;
      document.getElementById("m-desc").innerText = desc;
      document.getElementById("m-link").href = link;

      // Teknolojileri Listele
      const techList = document.getElementById("m-tech-list");
      techList.innerHTML = "";
      tech.split(",").forEach((t) => {
        if (t.trim()) {
          const span = document.createElement("span");
          span.innerText = t.trim();
          techList.appendChild(span);
        }
      });

      // Aç
      modal.classList.add("show");
    });
  });

  // Kapatma
  const closeModal = () => modal.classList.remove("show");
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});

// ======================================================
// 6. NEURAL NETWORK BACKGROUND (Canvas)
// ======================================================
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("neural-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height, particles;
  const particleCount = 40; // Sayıyı azalttım (Daha performanslı)
  const connectionDistance = 140;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.fillStyle = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-color")
        .trim();
      ctx.beginPath();
      ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  function init() {
    resize();
    particles = [];
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());
  }
  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p, i) => {
      p.update();
      p.draw();
      for (let j = i + 1; j < particles.length; j++) {
        const dx = p.x - particles[j].x,
          dy = p.y - particles[j].y,
          dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < connectionDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(150, 150, 150, ${
            1 - dist / connectionDistance
          })`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    });
    requestAnimationFrame(animate);
  }
  window.addEventListener("resize", resize);
  init();
  animate();
});
