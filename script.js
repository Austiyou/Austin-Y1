const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const form = document.getElementById('lead-form');
const statusEl = document.getElementById('form-status');

async function submitLead(payload) {
  const endpoints = ['./api/lead', '/api/lead', 'api/lead'];
  const failures = [];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const contentType = response.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      const body = isJson ? await response.json() : null;

      if (response.ok) {
        return { ok: true };
      }

      failures.push({ endpoint, status: response.status, body });

      if (response.status === 405) {
        continue;
      }

      if (response.status === 404) {
        continue;
      }

      throw new Error(
        body?.error
          || `Lead request failed (${response.status}). Please verify server and SMTP/Twilio configuration.`
      );
    } catch (error) {
      failures.push({ endpoint, status: 0, error });
    }
  }

  const saw405 = failures.some((f) => f.status === 405);
  const saw404 = failures.some((f) => f.status === 404);

  if (saw405) {
    throw new Error('Lead API rejected POST (405). This usually means your host is serving static files without the Node /api/lead backend route.');
  }

  if (saw404) {
    throw new Error('Lead API not found (404). Make sure the Node server is running and /api/lead is available.');
  }

  throw new Error('Network/server error sending lead. Please verify backend deployment and SMTP/Twilio settings.');
}

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
      await submitLead(payload);
      statusEl.textContent = 'Thanks! Your request has been sent. We will contact you soon.';
      statusEl.style.color = '#23613d';
      form.reset();
    } catch (error) {
      statusEl.textContent = error.message || 'Sorry, there was a problem sending your request. Please call or email us directly.';
      statusEl.style.color = '#a13a32';
    }
  });
}
