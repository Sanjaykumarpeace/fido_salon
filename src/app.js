
    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
    const waBase = "https://wa.me/919964162221";
    let selectedSlot = "";

    window.addEventListener("load", () => {
      setTimeout(() => {
        const loader = $("#loader");
        loader?.classList.add("hidden");
        setTimeout(() => loader?.remove(), 900);
      }, 650);
      const date = $("#date");
      if (date) date.min = new Date().toISOString().split("T")[0];
    });

    const updateScrollChrome = () => {
      $("#nav")?.classList.toggle("scrolled", window.scrollY > 36);
      $(".mobile-book")?.classList.toggle("visible", window.scrollY > Math.min(720, window.innerHeight * .72));
      $(".floating")?.classList.toggle("visible", window.scrollY > Math.min(620, window.innerHeight * .58));
      const heroMedia = $(".hero-media video, .hero-media img");
      if (heroMedia && window.innerWidth > 900) heroMedia.style.transform = `scale(1.03) translateY(${window.scrollY * .04}px)`;
    };
    window.addEventListener("scroll", updateScrollChrome, { passive: true });
    updateScrollChrome();

    const menuBtn = $("#menuBtn");
    const mobilePanel = $("#mobilePanel");
    menuBtn?.addEventListener("click", () => {
      mobilePanel.classList.toggle("open");
      document.body.classList.toggle("locked", mobilePanel.classList.contains("open"));
    });
    $$("#mobilePanel a").forEach(link => link.addEventListener("click", () => {
      mobilePanel.classList.remove("open");
      document.body.classList.remove("locked");
    }));

    const cursor = $("#cursor");
    if (cursor && matchMedia("(pointer:fine)").matches) {
      window.addEventListener("pointermove", event => {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
      });
      $$("a, button, .ba-wrap").forEach(el => {
        el.addEventListener("pointerenter", () => cursor.classList.add("active"));
        el.addEventListener("pointerleave", () => cursor.classList.remove("active"));
      });
    } else if (cursor) {
      cursor.style.display = "none";
    }

    const localFallbacks = [
      "src/fido-inside1.jpeg",
      "src/fido-inside2.jpeg",
      "src/fido-inside3.jpeg",
      "src/images/img6.jpeg",
      "src/images/img13.jpeg"
    ];
    $$("img").forEach((img, index) => {
      img.addEventListener("error", () => {
        img.src = localFallbacks[index % localFallbacks.length];
        img.dataset.fallbackApplied = "true";
      }, { once: true });
    });

    const trackPointerGlow = element => {
      element.addEventListener("pointermove", event => {
        const rect = element.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        element.style.setProperty("--mx", `${x}%`);
        element.style.setProperty("--my", `${y}%`);
      });
    };
    $$(".service-card, .gallery-item").forEach(trackPointerGlow);

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    $$(".reveal").forEach(el => observer.observe(el));

    $$(".ba-wrap").forEach(wrap => {
      const after = $(".after", wrap);
      const line = $(".ba-line", wrap);
      const handle = $(".ba-handle", wrap);
      const set = clientX => {
        const rect = wrap.getBoundingClientRect();
        const pos = Math.max(6, Math.min(94, ((clientX - rect.left) / rect.width) * 100));
        after.style.clipPath = `inset(0 0 0 ${pos}%)`;
        line.style.left = `${pos}%`;
        handle.style.left = `${pos}%`;
      };
      wrap.addEventListener("pointerdown", event => {
        wrap.setPointerCapture(event.pointerId);
        set(event.clientX);
      });
      wrap.addEventListener("pointermove", event => {
        if (event.buttons) set(event.clientX);
      });
    });

    $$(".chip").forEach(chip => {
      chip.addEventListener("click", () => {
        $$(".chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        const filter = chip.dataset.filter;
        $$(".gallery-item").forEach(item => {
          const visible = filter === "all" || item.dataset.cat === filter;
          item.style.display = visible ? "block" : "none";
        });
      });
    });

    const lightbox = $("#lightbox");
    const lightboxImg = $("#lightboxImg");
    $$(".gallery-item").forEach(item => {
      item.addEventListener("click", () => {
        const img = $("img", item);
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("open");
        document.body.classList.add("locked");
      });
    });
    $("[data-close-lightbox]")?.addEventListener("click", closeLightbox);
    lightbox?.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
    function closeLightbox() {
      lightbox.classList.remove("open");
      document.body.classList.remove("locked");
    }

    $$(".slot").forEach(slot => {
      slot.addEventListener("click", () => {
        $$(".slot").forEach(s => s.classList.remove("active"));
        slot.classList.add("active");
        selectedSlot = slot.textContent.trim();
      });
    });

    $("#bookingForm")?.addEventListener("submit", event => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const message = [
        "Hi FIDO Salon, I would like to book an appointment.",
        `Name: ${form.get("name")}`,
        `Phone: ${form.get("phone")}`,
        `Service: ${form.get("service")}`,
        `Preferred artist: ${form.get("stylist")}`,
        `Date: ${form.get("date")}`,
        `Time: ${selectedSlot || "Please suggest"}`,
        `Occasion: ${form.get("occasion")}`,
        `Notes: ${form.get("notes") || "None"}`
      ].join("\\n");
      const url = `${waBase}?text=${encodeURIComponent(message)}`;
      $("#successWa").href = url;
      $("#successModal").classList.add("open");
      document.body.classList.add("locked");
      setTimeout(() => window.open(url, "_blank", "noopener"), 650);
    });
    $("[data-close-success]")?.addEventListener("click", () => {
      $("#successModal").classList.remove("open");
      document.body.classList.remove("locked");
    });

    $$("#quizOptions button").forEach(button => {
      button.addEventListener("click", () => {
        $$("#quizOptions button").forEach(b => b.classList.remove("active"));
        button.classList.add("active");
        $("#quizResult").textContent = button.dataset.result;
      });
    });

    $$(".faq-q").forEach(button => {
      button.addEventListener("click", () => {
        const item = button.closest(".faq-item");
        item.classList.toggle("open");
      });
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeLightbox();
        $("#successModal")?.classList.remove("open");
        mobilePanel?.classList.remove("open");
        document.body.classList.remove("locked");
      }
    });
  
