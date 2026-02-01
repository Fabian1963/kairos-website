/* =====================================================
   KAIROS TRANSPORTES - JavaScript Principal
   ===================================================== */

// =====================================================
// PRELOADER
// =====================================================
window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 500);
  }
});

document.addEventListener('DOMContentLoaded', function () {

  // =====================================================
  // NAVBAR SCROLL EFFECT
  // =====================================================
  const navbar = document.getElementById('mainNav');

  function handleNavbarScroll() {
    if (window.scrollY > 100) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  // =====================================================
  // ACTIVE LINK ON SCROLL
  // =====================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    const scrollPos = window.scrollY + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  // =====================================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // =====================================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        const offsetTop = target.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse?.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        }
      }
    });
  });

  // =====================================================
  // BACK TO TOP BUTTON
  // =====================================================
  const backToTop = document.getElementById('back-to-top');

  function handleBackToTopVisibility() {
    if (window.scrollY > 500) {
      backToTop?.classList.add('visible');
    } else {
      backToTop?.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleBackToTopVisibility);
  handleBackToTopVisibility();

  // =====================================================
  // STATS COUNTER ANIMATION
  // =====================================================
  function animateCounter(element, target) {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toLocaleString('es-AR');
    }, stepDuration);
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = entry.target.querySelectorAll('.stat-value');
          counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target') || '0', 10);
            animateCounter(counter, target);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // =====================================================
  // GALLERY FILTER FUNCTIONALITY
  // =====================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach((item) => {
        if (filter === '*' || item.getAttribute('data-category') === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // =====================================================
  // LIGHTBOX FUNCTIONALITY
  // =====================================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.querySelector('.lightbox-close');
  const zoomBtns = document.querySelectorAll('.btn-zoom');

  zoomBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const imgSrc = btn.getAttribute('data-lightbox');
      if (imgSrc && lightboxImage) {
        lightboxImage.src = imgSrc;
        lightbox?.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose?.addEventListener('click', closeLightbox);

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });

  // =====================================================
  // CONTACT FORM VALIDATION & SUBMISSION
  // =====================================================
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset validation
    form.classList.remove('was-validated');

    // Check validity
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');

    btnText?.classList.add('d-none');
    btnLoading?.classList.remove('d-none');
    submitBtn?.setAttribute('disabled', 'true');

    // Simulate form submission (replace with actual endpoint)
    try {
      // Since there's no backend, show success message
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (formMessage) {
        formMessage.className = 'form-message success';
        formMessage.innerHTML =
          '<i class="bi bi-check-circle me-2"></i>Mensaje enviado correctamente! Nos pondremos en contacto pronto.';
      }

      form.reset();
    } catch (error) {
      if (formMessage) {
        formMessage.className = 'form-message error';
        formMessage.innerHTML =
          '<i class="bi bi-exclamation-circle me-2"></i>Hubo un error al enviar el mensaje. Por favor intente nuevamente.';
      }
    } finally {
      btnText?.classList.remove('d-none');
      btnLoading?.classList.add('d-none');
      submitBtn?.removeAttribute('disabled');
    }
  });

});
