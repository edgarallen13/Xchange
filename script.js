/**
 * Xchange - Landing Page Scripts
 * Includes:
 * 1. Mobile Menu Drawer Toggle
 * 2. Registration Modal (Open, Close, Form Validation & Success Confirmation)
 * 3. Role Selector Card Interaction
 * 4. Smooth Scrolling & Scrollspy Active Nav Highlighting
 * 5. Sticky Navbar Shadow Enhancement
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('top-navbar');

  // Modal Elements
  const registerModal = document.getElementById('register-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDoneBtn = document.getElementById('modal-done-btn');
  const registerButtons = document.querySelectorAll('.btn-register');
  const regForm = document.getElementById('registration-form');
  const formView = document.getElementById('modal-form-view');
  const successView = document.getElementById('modal-success-view');

  // Form Fields & Feedback Elements
  const inputName = document.getElementById('reg-name');
  const inputEmail = document.getElementById('reg-email');
  const inputTerms = document.getElementById('reg-terms');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const termsError = document.getElementById('terms-error');
  const submitBtn = document.getElementById('submit-btn');

  // Success view fields
  const successUserName = document.getElementById('success-user-name');
  const successUserRole = document.getElementById('success-user-role');
  const successUserEmail = document.getElementById('success-user-email');

  // Role selector cards
  const roleCards = document.querySelectorAll('.role-option');

  /* ==========================================================================
     1. Mobile Hamburger Menu Toggle
     ========================================================================== */
  function toggleMobileMenu(forceClose = false) {
    const isOpened = forceClose ? false : !navMenu.classList.contains('active');
    
    if (isOpened) {
      navMenu.classList.add('active');
      mobileToggle.classList.add('active');
      mobileToggle.setAttribute('aria-expanded', 'true');
      mobileOverlay.style.display = 'block';
      document.body.classList.add('mobile-nav-open');
    } else {
      navMenu.classList.remove('active');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileOverlay.style.display = 'none';
      document.body.classList.remove('mobile-nav-open');
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => {
      toggleMobileMenu(true);
    });
  }

  // Close mobile nav when clicking any nav link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggleMobileMenu(true);
    });
  });

  // Automatically reset mobile menu on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
      toggleMobileMenu(true);
    }
  });

  /* ==========================================================================
     2. Registration Modal Functionality
     ========================================================================== */
  function openRegisterModal(e) {
    if (e) e.preventDefault();
    
    // Close mobile menu if open
    toggleMobileMenu(true);

    // Reset view to form state (unless already filled)
    resetModalView();

    registerModal.classList.add('active');
    registerModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // Auto focus name input
    setTimeout(() => {
      if (inputName) inputName.focus();
    }, 150);
  }

  function closeRegisterModal() {
    registerModal.classList.remove('active');
    registerModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  function resetModalView() {
    formView.style.display = 'block';
    successView.style.display = 'none';
    clearErrors();
    if (submitBtn) {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  }

  function clearErrors() {
    if (inputName) inputName.classList.remove('input-error');
    if (inputEmail) inputEmail.classList.remove('input-error');
    if (nameError) nameError.classList.remove('visible');
    if (emailError) emailError.classList.remove('visible');
    if (termsError) termsError.classList.remove('visible');
  }

  // Bind all "Register Now" buttons
  registerButtons.forEach((btn) => {
    btn.addEventListener('click', openRegisterModal);
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeRegisterModal);
  }

  if (modalDoneBtn) {
    modalDoneBtn.addEventListener('click', () => {
      closeRegisterModal();
      regForm.reset();
      resetRoleCards();
    });
  }

  // Click outside modal content to close
  if (registerModal) {
    registerModal.addEventListener('click', (e) => {
      if (e.target === registerModal) {
        closeRegisterModal();
      }
    });
  }

  // ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && registerModal.classList.contains('active')) {
      closeRegisterModal();
    }
  });

  /* ==========================================================================
     3. Role Selector Cards Interaction
     ========================================================================== */
  function resetRoleCards() {
    roleCards.forEach((card) => {
      const radio = card.querySelector('input[type="radio"]');
      if (radio && radio.value === 'Buyer') {
        radio.checked = true;
        card.classList.add('active');
      } else {
        if (radio) radio.checked = false;
        card.classList.remove('active');
      }
    });
  }

  roleCards.forEach((card) => {
    card.addEventListener('click', () => {
      roleCards.forEach((c) => c.classList.remove('active'));
      card.classList.add('active');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  /* ==========================================================================
     4. Form Submission & Mock Account Confirmation
     ========================================================================== */
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      const nameVal = inputName ? inputName.value.trim() : '';
      const emailVal = inputEmail ? inputEmail.value.trim() : '';
      const termsAccepted = inputTerms ? inputTerms.checked : true;
      const selectedRoleRadio = document.querySelector('input[name="userRole"]:checked');
      const roleVal = selectedRoleRadio ? selectedRoleRadio.value : 'Buyer';

      // Validation
      let isValid = true;

      // Validate Name
      if (!nameVal || nameVal.length < 2) {
        isValid = false;
        if (inputName) inputName.classList.add('input-error');
        if (nameError) nameError.classList.add('visible');
      }

      // Validate Email (standard regex)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal || !emailRegex.test(emailVal)) {
        isValid = false;
        if (inputEmail) inputEmail.classList.add('input-error');
        if (emailError) emailError.classList.add('visible');
      }

      // Validate Terms
      if (!termsAccepted) {
        isValid = false;
        if (termsError) termsError.classList.add('visible');
      }

      if (!isValid) return;

      // Simulate network submission state
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        // Populate confirmation view
        if (successUserName) successUserName.textContent = nameVal;
        if (successUserRole) successUserRole.textContent = roleVal;
        if (successUserEmail) successUserEmail.textContent = emailVal;

        // Transition views
        formView.style.display = 'none';
        successView.style.display = 'flex';
      }, 600);
    });
  }

  // Clear validation styling when user types
  if (inputName) {
    inputName.addEventListener('input', () => {
      inputName.classList.remove('input-error');
      if (nameError) nameError.classList.remove('visible');
    });
  }

  if (inputEmail) {
    inputEmail.addEventListener('input', () => {
      inputEmail.classList.remove('input-error');
      if (emailError) emailError.classList.remove('visible');
    });
  }

  if (inputTerms) {
    inputTerms.addEventListener('change', () => {
      if (inputTerms.checked && termsError) termsError.classList.remove('visible');
    });
  }

  /* ==========================================================================
     5. Smooth Scrolling for In-Page Anchor Links
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      // If href is just '#' or opens modal via register class, skip
      if (targetId === '#' || this.classList.contains('btn-register')) {
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 70;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==========================================================================
     6. Navbar Scroll Effect & Scrollspy Active Link State
     ========================================================================== */
  const sections = document.querySelectorAll('section[id], footer[id]');

  function handleScroll() {
    const scrollY = window.pageYOffset;

    // Navbar shadow on scroll
    if (navbar) {
      if (scrollY > 15) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scrollspy: update active nav link
    const navHeight = navbar ? navbar.offsetHeight : 70;
    let currentSectionId = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navHeight - 60;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial run on load
});

