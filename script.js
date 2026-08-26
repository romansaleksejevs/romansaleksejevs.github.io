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



// Certificate carousel — robust transform version for GitHub Pages
(() => {
  const track = document.querySelector(".certificate-gallery");
  const viewport = document.querySelector(".certificate-carousel");
  const prev = document.querySelector(".certificate-prev");
  const next = document.querySelector(".certificate-next");
  const dotsWrap = document.querySelector(".certificate-dots");

  if (!track || !viewport || !prev || !next || !dotsWrap) return;

  const cards = Array.from(track.querySelectorAll(".certificate-card"));
  let page = 0;

  const visibleCount = () => {
    if (window.innerWidth <= 620) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  };

  const pageCount = () => Math.ceil(cards.length / visibleCount());

  function rebuildDots() {
    dotsWrap.innerHTML = "";
    for (let i = 0; i < pageCount(); i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "certificate-dot";
      dot.setAttribute("aria-label", `Show certificate page ${i + 1}`);
      dot.addEventListener("click", () => {
        page = i;
        render();
      });
      dotsWrap.appendChild(dot);
    }
  }

  function render() {
    const count = visibleCount();
    const pages = pageCount();
    page = Math.max(0, Math.min(page, pages - 1));

    const gap = 18;
    const viewportWidth = viewport.clientWidth;
    const cardWidth = (viewportWidth - gap * (count - 1)) / count;
    const offset = page * count * (cardWidth + gap);

    track.style.transform = `translate3d(${-offset}px,0,0)`;

    prev.disabled = page === 0;
    next.disabled = page >= pages - 1;

    Array.from(dotsWrap.children).forEach((dot, i) => {
      dot.classList.toggle("active", i === page);
    });
  }

  prev.addEventListener("click", () => {
    if (page > 0) {
      page -= 1;
      render();
    }
  });

  next.addEventListener("click", () => {
    if (page < pageCount() - 1) {
      page += 1;
      render();
    }
  });

  let timer;
  window.addEventListener("resize", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      page = 0;
      rebuildDots();
      render();
    }, 120);
  });

  rebuildDots();
  requestAnimationFrame(render);
})();
