const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const requiredEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'LEAD_TO_EMAIL'];

app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/lead', async (req, res) => {
  const { name, email, phone, interest, projectType, location, message } = req.body || {};

  if (!name || !email || !interest || !projectType || !location || !message) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  if (requiredEnv.some((key) => !process.env[key])) {
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const subject = `New Rooted Renovations Lead: ${interest}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || 'Not provided'}`,
    `Intent: ${interest}`,
    `Project Type: ${projectType}`,
    `Location: ${location}`,
    '',
    'Project Details:',
    message
  ].join('\n');

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.LEAD_TO_EMAIL,
      replyTo: email,
      subject,
      text
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Unable to send email.' });
  }
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Rooted Renovations site running on http://localhost:${port}`);
});
