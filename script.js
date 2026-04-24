const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.getElementById('site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const bookingForm = document.getElementById('booking-form');
const statusEl = document.getElementById('form-status');

if (bookingForm && statusEl) {
  bookingForm.addEventListener('submit', (event) => {
    const action = bookingForm.getAttribute('action') || '';

    // Prevent accidental submission while placeholder endpoint is still in place.
    if (action.includes('FORM_ENDPOINT')) {
      event.preventDefault();
      statusEl.textContent = 'Form endpoint not configured yet. Please call or text 417-592-0300 to reserve now.';
      statusEl.style.color = '#9a3412';
      return;
    }

    statusEl.textContent = 'Sending your booking request...';
    statusEl.style.color = '#1d4fa3';
  });
}
