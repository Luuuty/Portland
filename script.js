// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const targetId = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Lightweight form UX: disable button on submit to prevent double sends
const form = document.querySelector('.contact-form');
if (form) {
  let statusEl = form.querySelector('.form-status');
  if (!statusEl) {
    statusEl = document.createElement('p');
    statusEl.className = 'form-status';
    statusEl.style.color = '#9fb2c8';
    statusEl.style.fontSize = '13px';
    statusEl.style.margin = '6px 0 0';
    form.appendChild(statusEl);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Sending...';
      btn.classList.add('ghost');
    }
    statusEl.textContent = 'Sending...';

    const name = form.elements['name']?.value || '';
    const contact = form.elements['contact']?.value || '';
    const unit = form.elements['unit']?.value || '';
    const issue = form.elements['issue']?.value || '';

    fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, contact, unit, issue })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed');
        form.reset();
        statusEl.textContent = 'Sent to dispatch. We will reply shortly.';
      })
      .catch(() => {
        statusEl.textContent = 'Could not send. Please email info.swtruckrepair@gmail.com or call +1 (971) 294-3367.';
      })
      .finally(() => {
        if (btn) {
          btn.disabled = false;
          btn.textContent = 'Send to dispatch';
          btn.classList.remove('ghost');
        }
      });
  });
}
