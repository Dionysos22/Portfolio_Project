document.addEventListener("DOMContentLoaded", () => {
  /* =========================================
     1. MOBİL MENÜ (HAMBURGER) İŞLEMLERİ
     ========================================= */
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

  /* =========================================
     2. İLETİŞİM FORMU İŞLEMLERİ
     ========================================= */
  const contactForm = document.getElementById("iletisimFormu");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("isim").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("mesaj").value.trim();

      if (name === "" || email === "" || message === "") {
        alert("Lütfen tüm alanları doldurunuz!");
        return;
      }

      console.log("Form Verisi:", {
        isim: name,
        email: email,
        mesaj: message,
        tarih: new Date(),
      });

      alert("Teşekkürler " + name + "! Mesajınız alındı (Simülasyon).");
      contactForm.reset();
    });
  }
});
/* --- DAKTİLO EFEKTİ --- */
const textElement = document.querySelector(".typewriter");
if (textElement) {
  const texts = [
    "Bilgisayar Mühendisliği Öğrencisiyim.",
    "Yazılım Geliştiriciyim.",
  ];
  let count = 0;
  let index = 0;
  let currentText = "";
  let letter = "";

  (function type() {
    if (count === texts.length) {
      count = 0;
    }
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
