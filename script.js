const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const form = document.getElementById('lead-form');
const statusEl = document.getElementById('form-status');
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdabrwee';

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
    statusEl.textContent = 'Sending your request...';
    statusEl.style.color = '#435346';

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const contentType = response.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      const body = isJson ? await response.json() : null;

      if (!response.ok) {
        throw new Error(body?.errors?.[0]?.message || body?.error || 'Unable to submit your request right now. Please try again or call us directly.');
      }

      statusEl.textContent = 'Success! Your consultation request was sent. We will contact you shortly.';
      statusEl.style.color = '#23613d';
      form.reset();
    } catch (error) {
      statusEl.textContent = error.message || 'Submission failed. Please try again or contact us by phone/email.';
      statusEl.style.color = '#a13a32';
    }
  });
}
