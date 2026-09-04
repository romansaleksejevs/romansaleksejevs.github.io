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


// Certificate gallery modal — same visual style as the technical detail popups
(() => {
  const modal = document.getElementById("certificate-lightbox");
  const frame = document.getElementById("certificate-lightbox-frame");
  const closeBtn = modal?.querySelector(".certificate-lightbox-close");
  const cards = document.querySelectorAll(".certificate-pdf");

  if (!modal || !frame || !closeBtn || !cards.length) return;

  let lastFocusedElement = null;

  function openCertificateModal(card) {
    const pdfUrl = card.getAttribute("href");
    if (!pdfUrl) return;

    lastFocusedElement = document.activeElement;
    frame.src = pdfUrl;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeCertificateModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    frame.src = "";
    document.body.style.overflow = "";
    lastFocusedElement?.focus();
  }

  cards.forEach(card => {
    card.addEventListener("click", event => {
      event.preventDefault();
      openCertificateModal(card);
    });
  });

  closeBtn.addEventListener("click", closeCertificateModal);
  modal.addEventListener("click", event => {
    if (event.target === modal) closeCertificateModal();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeCertificateModal();
    }
  });
})();


// Certificate carousel — robust transform version for GitHub Pages
(() => {
  const track = document.querySelector(".certificate-gallery");
  const viewport = document.querySelector(".certificate-viewport");
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


// Enterprise Networking technical details modal
(() => {
  const card = document.querySelector(".enterprise-network-card");
  const modal = document.getElementById("enterprise-network-modal");
  const closeBtn = modal?.querySelector(".network-modal-close");
  if (!card || !modal || !closeBtn) return;

  let lastFocusedElement = null;

  function openNetworkModal() {
    lastFocusedElement = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeNetworkModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lastFocusedElement?.focus();
  }

  card.addEventListener("click", openNetworkModal);
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openNetworkModal();
    }
  });

  closeBtn.addEventListener("click", closeNetworkModal);
  modal.addEventListener("click", event => {
    if (event.target === modal) closeNetworkModal();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeNetworkModal();
    }
  });
})();


// Enterprise Data Center Network technical details modal
(() => {
  const card = document.querySelector(".data-center-card");
  const modal = document.getElementById("data-center-modal");
  const closeBtn = modal?.querySelector(".data-center-modal-close");
  if (!card || !modal || !closeBtn) return;
  let lastFocusedElement = null;
  function openModal() { lastFocusedElement = document.activeElement; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; closeBtn.focus(); }
  function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; lastFocusedElement?.focus(); }
  card.addEventListener("click", openModal);
  card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(); }});
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });
})();

// Network Security technical details modal
(() => {
  const card = document.querySelector(".network-security-card");
  const modal = document.getElementById("network-security-modal");
  const closeBtn = modal?.querySelector(".network-security-modal-close");
  if (!card || !modal || !closeBtn) return;
  let lastFocusedElement = null;
  function openModal() { lastFocusedElement = document.activeElement; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; closeBtn.focus(); }
  function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; lastFocusedElement?.focus(); }
  card.addEventListener("click", openModal);
  card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(); }});
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });
})();


// Load Balancing technical details modal
(() => {
  const card = document.querySelector(".load-balancing-card");
  const modal = document.getElementById("load-balancing-modal");
  const closeBtn = modal?.querySelector(".load-balancing-modal-close");
  if (!card || !modal || !closeBtn) return;
  let lastFocusedElement;
  function openModal() { lastFocusedElement = document.activeElement; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; closeBtn.focus(); }
  function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; lastFocusedElement?.focus(); }
  card.addEventListener("click", openModal);
  card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(); } });
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });
})();


// Cloud Networking technical details modal
(() => {
  const card = document.querySelector(".cloud-networking-card");
  const modal = document.getElementById("cloud-networking-modal");
  const closeBtn = modal?.querySelector(".cloud-networking-modal-close");
  if (!card || !modal || !closeBtn) return;
  let lastFocusedElement;
  function openModal() { lastFocusedElement = document.activeElement; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; closeBtn.focus(); }
  function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; lastFocusedElement?.focus(); }
  card.addEventListener("click", openModal);
  card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(); } });
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });
})();

// Network / Infrastructure Automation technical details modal
(() => {
  const card = document.querySelector(".automation-card");
  const modal = document.getElementById("automation-modal");
  const closeBtn = modal?.querySelector(".automation-modal-close");
  if (!card || !modal || !closeBtn) return;
  let lastFocusedElement;
  function openModal() { lastFocusedElement = document.activeElement; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; closeBtn.focus(); }
  function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; lastFocusedElement?.focus(); }
  card.addEventListener("click", openModal);
  card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(); } });
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });
})();


// Tele2 work experience details modal
(() => {
  const button = document.querySelector(".tele2-more-details");
  const modal = document.getElementById("tele2-modal");
  const closeBtn = modal?.querySelector(".tele2-modal-close");
  if (!button || !modal || !closeBtn) return;
  let lastFocusedElement;
  function openModal() { lastFocusedElement = document.activeElement; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; closeBtn.focus(); }
  function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; lastFocusedElement?.focus(); }
  button.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });
})();


// Evolution work experience details modal
(() => {
  const button = document.querySelector(".evolution-more-details");
  const modal = document.getElementById("evolution-modal");
  const closeBtn = modal?.querySelector(".evolution-modal-close");
  if (!button || !modal || !closeBtn) return;
  let lastFocusedElement;
  function openModal() { lastFocusedElement = document.activeElement; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; closeBtn.focus(); }
  function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; lastFocusedElement?.focus(); }
  button.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });
})();

// Accenture work experience details modal
(() => {
  const button = document.querySelector(".accenture-more-details");
  const modal = document.getElementById("accenture-modal");
  const closeBtn = modal?.querySelector(".accenture-modal-close");
  if (!button || !modal || !closeBtn) return;
  let lastFocusedElement;
  function openModal() { lastFocusedElement = document.activeElement; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; closeBtn.focus(); }
  function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; lastFocusedElement?.focus(); }
  button.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });
})();


// v51: Keep external company links independent from any parent click handlers.
document.querySelectorAll('.company-link').forEach(link => {
  link.addEventListener('click', event => {
    event.stopPropagation();
  });
});

// v78: NetBox Source of Truth technical details modal
(() => {
  const button = document.querySelector(".netbox-more-details");
  const modal = document.getElementById("netbox-modal");
  const closeBtn = modal?.querySelector(".netbox-modal-close");
  if (!button || !modal || !closeBtn) return;
  let lastFocusedElement = null;
  function openModal() {
    lastFocusedElement = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }
  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lastFocusedElement?.focus();
  }
  button.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("open")) closeModal();
  });
})();


// v85: Full-screen NetBox screenshot preview
(() => {
  const trigger = document.querySelector('.netbox-image-open');
  const lightbox = document.getElementById('netbox-image-lightbox');
  const closeBtn = lightbox?.querySelector('.netbox-image-lightbox-close');
  if (!trigger || !lightbox || !closeBtn) return;
  function openImage() { lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden','false'); closeBtn.focus(); }
  function closeImage() { lightbox.classList.remove('open'); lightbox.setAttribute('aria-hidden','true'); trigger.focus(); }
  trigger.addEventListener('click', openImage);
  closeBtn.addEventListener('click', closeImage);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeImage(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox.classList.contains('open')) { e.stopImmediatePropagation(); closeImage(); } }, true);
})();


// v86: Tufin Implementation technical details modal
(() => {
  const button = document.querySelector(".tufin-more-details");
  const modal = document.getElementById("tufin-modal");
  const closeBtn = modal?.querySelector(".tufin-modal-close");
  if (!button || !modal || !closeBtn) return;
  let lastFocusedElement = null;
  function openModal() { lastFocusedElement = document.activeElement; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; closeBtn.focus(); }
  function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; lastFocusedElement?.focus(); }
  button.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });
})();

// v88: SD-WAN Implementation technical details modal
(() => {
  const button = document.querySelector(".sdwan-more-details");
  const modal = document.getElementById("sdwan-modal");
  const closeBtn = modal?.querySelector(".sdwan-modal-close");
  if (!button || !modal || !closeBtn) return;
  let lastFocusedElement = null;
  function openModal() { lastFocusedElement = document.activeElement; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; closeBtn.focus(); }
  function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; lastFocusedElement?.focus(); }
  button.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });
})();

// v90: Azure Cloud technical details modal
(() => {
  const button = document.querySelector(".azure-more-details");
  const modal = document.getElementById("azure-modal");
  const closeBtn = modal?.querySelector(".azure-modal-close");
  if (!button || !modal || !closeBtn) return;
  let lastFocusedElement = null;
  function openModal() { lastFocusedElement = document.activeElement; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; closeBtn.focus(); }
  function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; lastFocusedElement?.focus(); }
  button.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });
})();


// v91: VMware NSX-T technical details modal
(() => {
  const button = document.querySelector(".nsxt-more-details");
  const modal = document.getElementById("nsxt-modal");
  const closeBtn = modal?.querySelector(".nsxt-modal-close");
  if (!button || !modal || !closeBtn) return;
  let lastFocusedElement = null;
  function openModal() { lastFocusedElement = document.activeElement; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; closeBtn.focus(); }
  function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; lastFocusedElement?.focus(); }
  button.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });
})();
