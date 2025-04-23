document.addEventListener('DOMContentLoaded', () => {
  let lastScroll = 0;
  const header = document.querySelector('.header');

  const form = document.getElementById('feedbackForm');
  const modal = document.getElementById('succesModal');
  const modalMsg = document.getElementById('modalMsg');

  function updateHeader() {
    const currentScroll = window.pageYOffset;
    const scrollDiff = currentScroll - lastScroll;

    const opacity = Math.min(currentScroll / 200, 0.9);
    const translateY = -Math.min(currentScroll / 10, 20);

    header.style.transform = `translateY(${translateY}px)`;
    header.style.background = `linear-gradient(to bottom, rgba(0, 0, 0, ${opacity}) 0%, rgba(255, 255, 255, 0) 100%)`;

    lastScroll = currentScroll;
    requestAnimationFrame(updateHeader);
  }

  function validateName(name) {
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,50}$/;
    if (!name.trim()) return 'Name is required';
    if (!nameRegex.test(name))
      return 'Name should contain 2-50 letters, spaces or hyphens';
    return null;
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return null;
  }

  function showError(input, message) {
    const formGroup =
      input.closest('.form_inputs') || input.closest('.form_privacy');
    let error = formGroup.querySelector('.error-message');

    if (!error) {
      error = document.createElement('div');
      error.className = 'error-message';

      if (input.type === 'checkbox') {
        const textElement = formGroup.querySelector('.form_privacy__text');
        textElement.insertAdjacentElement('afterend', error);
      } else {
        formGroup.appendChild(error);
      }
    }

    error.textContent = message;
    input.classList.add('error');
  }

  function clearError(input) {
    const formGroup =
      input.closest('.form_inputs') || input.closest('.form_privacy');
    const error = formGroup.querySelector('.error-message');
    if (error) error.remove();
    input.classList.remove('error');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.querySelector('[name="name"]');
    const emailInput = form.querySelector('[name="email"]');
    const privacyCheckbox = form.querySelector('[name="privacy"]');

    const name = nameInput.value;
    const email = emailInput.value;
    const isPrivacyAccepted = privacyCheckbox.checked;

    const nameError = validateName(name);
    const emailError = validateEmail(email);

    clearError(nameInput);
    clearError(emailInput);
    clearError(privacyCheckbox);

    let isValid = true;

    if (nameError) {
      showError(nameInput, nameError);
      isValid = false;
    }

    if (emailError) {
      showError(emailInput, emailError);
      isValid = false;
    }

    if (!isPrivacyAccepted) {
      showError(privacyCheckbox, 'You must accept the Privacy Policy');
      isValid = false;
    }

    if (!isValid) return;

    modalMsg.textContent = `Thank you, ${name}. We will contact you at ${email} as soon as possible.`;
    modal.classList.add('active');

    setTimeout(() => {
      modal.classList.remove('active');
    }, 3000);

    form.reset();
  });

  form.querySelector('[name="name"]').addEventListener('input', function () {
    clearError(this);
    const error = validateName(this.value);
    if (error) showError(this, error);
  });

  form.querySelector('[name="email"]').addEventListener('input', function () {
    clearError(this);
    const error = validateEmail(this.value);
    if (error) showError(this, error);
  });

  form
    .querySelector('[name="privacy"]')
    .addEventListener('change', function () {
      clearError(this);
      if (!this.checked) showError(this, 'You must accept the Privacy Policy');
    });

  updateHeader();
});
