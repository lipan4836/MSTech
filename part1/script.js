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

updateHeader();
