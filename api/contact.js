import { Resend } from 'resend';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = { name: 100, email: 200, message: 2000 };

function validate(body) {
  const errors = {};
  if (!body.name || !body.name.trim() || body.name.length > MAX_LENGTHS.name) {
    errors.name = 'Name is required.';
  }
  if (!body.email || !EMAIL_PATTERN.test(body.email) || body.email.length > MAX_LENGTHS.email) {
    errors.email = 'A valid email is required.';
  }
  if (!body.message || !body.message.trim() || body.message.length > MAX_LENGTHS.message) {
    errors.message = 'A message is required.';
  }
  return errors;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body ?? {};

  // Honeypot: if the hidden `company` field is filled, this is a bot.
  // Respond as if it worked so the bot never learns it was caught.
  if (body.company) {
    return res.status(200).json({ ok: true });
  }

  const errors = validate(body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Portfolio Contact Form <contact@priyamsbajracharya.com.np>',
      to: 'priyams.bajracharya@gmail.com',
      replyTo: body.email,
      subject: `New message from ${body.name}`,
      text: `From: ${body.name} <${body.email}>\n\n${body.message}`,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
}
