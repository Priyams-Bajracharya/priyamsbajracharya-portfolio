import { useState } from 'react';

const INITIAL_FORM = { name: '', email: '', message: '', company: '' }; // `company` is the honeypot

// Visually hidden but NOT display:none (some unsophisticated bots skip
// display:none fields) and not reachable by keyboard (tabIndex -1) or
// screen readers (aria-hidden on the wrapper).
const HONEYPOT_STYLE = { position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!form.message.trim()) {
    errors.message = 'Message is required.';
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message should be at least 10 characters.';
  }
  return errors;
}

export function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // Honeypot filled -> fake success, never call the API or tip off the bot.
    if (form.company) {
      setStatus('success');
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });

      if (!response.ok) throw new Error('Request failed');

      setStatus('success');
      setForm(INITIAL_FORM);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p role="status" className="rounded-lg border border-accent bg-bg-surface p-5 text-text-primary">
        Thanks for reaching out — I'll get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="block font-mono text-xs uppercase tracking-wide text-text-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className="mt-1 w-full rounded-md border border-border bg-bg-surface px-3 py-2 text-text-primary outline-none focus:border-accent"
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-400">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wide text-text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className="mt-1 w-full rounded-md border border-border bg-bg-surface px-3 py-2 text-text-primary outline-none focus:border-accent"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block font-mono text-xs uppercase tracking-wide text-text-muted">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className="mt-1 w-full rounded-md border border-border bg-bg-surface px-3 py-2 text-text-primary outline-none focus:border-accent"
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <div style={HONEYPOT_STYLE} aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={handleChange} />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-md bg-accent px-5 py-2.5 font-medium text-bg-base transition-colors hover:bg-accent-soft disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>

      <p role="status" aria-live="polite" className="text-sm text-text-muted">
        {status === 'error' && 'Something went wrong — please try again or email me directly.'}
      </p>
    </form>
  );
}
