let lastScroll = 0;
const header = document.querySelector('.header');

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

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedbackForm');
  const modal = document.getElementById('succesModal');
  const modalMsg = document.getElementById('modalMsg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;
    const isPrivacyAccepted = form.querySelector('[name="privacy"]').checked;

    if (!isPrivacyAccepted) {
      alert('Please accept the Privacy policy');
      return;
    }

    modalMsg.textContent = `Thank you, ${name}. We will contact you at ${email} as soon as possible.`;
    modal.classList.add('active');

    setTimeout(() => {
      modal.classList.remove('active');
    }, 3000);

    form.reset();
  });
});

updateHeader();
