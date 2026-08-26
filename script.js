document.getElementById("year").textContent = new Date().getFullYear();

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(link =>
  link.addEventListener("click", () => nav.classList.remove("open"))
);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));


// Certificate gallery lightbox
const certificateLightbox = document.getElementById("certificate-lightbox");
const certificateLightboxImage = document.getElementById("certificate-lightbox-image");
const certificateClose = document.querySelector(".certificate-lightbox-close");

document.querySelectorAll("[data-certificate]").forEach(card => {
  card.addEventListener("click", () => {
    certificateLightboxImage.src = card.dataset.certificate;
    certificateLightbox.classList.add("open");
    certificateLightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});

function closeCertificateLightbox() {
  certificateLightbox.classList.remove("open");
  certificateLightbox.setAttribute("aria-hidden", "true");
  certificateLightboxImage.src = "";
  document.body.style.overflow = "";
}

certificateClose?.addEventListener("click", closeCertificateLightbox);
certificateLightbox?.addEventListener("click", event => {
  if (event.target === certificateLightbox) closeCertificateLightbox();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && certificateLightbox?.classList.contains("open")) {
    closeCertificateLightbox();
  }
});


// Certificate carousel
(() => {
  const gallery = document.querySelector(".certificate-gallery");
  const prev = document.querySelector(".certificate-prev");
  const next = document.querySelector(".certificate-next");
  const dotsWrap = document.querySelector(".certificate-dots");
  if (!gallery || !prev || !next || !dotsWrap) return;

  const cards = [...gallery.querySelectorAll(".certificate-card")];
  let page = 0;

  const visibleCount = () => {
    if (window.innerWidth <= 620) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  };

  const pageCount = () => Math.ceil(cards.length / visibleCount());

  const buildDots = () => {
    dotsWrap.innerHTML = "";
    for (let i = 0; i < pageCount(); i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "certificate-dot";
      dot.setAttribute("aria-label", `Show certificate page ${i + 1}`);
      dot.addEventListener("click", () => { page = i; update(); });
      dotsWrap.appendChild(dot);
    }
  };

  const update = () => {
    const count = visibleCount();
    const maxPage = Math.max(0, pageCount() - 1);
    page = Math.min(page, maxPage);
    const first = cards[page * count];
    if (first) gallery.scrollTo({left:first.offsetLeft - gallery.offsetLeft, behavior:"smooth"});
    prev.disabled = page === 0;
    next.disabled = page === maxPage;
    [...dotsWrap.children].forEach((d, i) => d.classList.toggle("active", i === page));
  };

  prev.addEventListener("click", () => { if (page > 0) { page--; update(); } });
  next.addEventListener("click", () => { if (page < pageCount() - 1) { page++; update(); } });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { page = 0; buildDots(); update(); }, 120);
  });

  buildDots();
  update();
})();
