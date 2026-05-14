const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const form = document.getElementById('lead-form');
const statusEl = document.getElementById('form-status');

if (form && statusEl) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      statusEl.textContent = 'Please complete the required fields.';
      statusEl.style.color = '#a13a32';
      form.reportValidity();
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());
    statusEl.textContent = 'Sending your message...';
    statusEl.style.color = '#435346';

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(body.error || 'Request failed');
      }

      statusEl.textContent = 'Thanks! Your request has been sent. We will contact you soon.';
      statusEl.style.color = '#23613d';
      form.reset();
    } catch (error) {
      statusEl.textContent = error.message || 'Sorry, there was a problem sending your request. Please call or email us directly.';
      statusEl.style.color = '#a13a32';
    }
  });
}
