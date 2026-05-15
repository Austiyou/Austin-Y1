const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const requiredEmailEnv = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'LEAD_TO_EMAIL'];
const hasEmailConfig = requiredEmailEnv.every((key) => process.env[key]);

const hasSmsConfig = [
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
  process.env.TWILIO_FROM_NUMBER,
  process.env.LEAD_TO_SMS
].every(Boolean);

const smtpTransporter = hasEmailConfig ? nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
}) : null;

const smsClient = hasSmsConfig
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/lead', async (req, res) => {
  const { name, email, phone, interest, projectType, location, message } = req.body || {};

  if (!name || !email || !interest || !projectType || !location || !message) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  if (!smtpTransporter && !smsClient) {
    return res.status(500).json({ error: 'Lead notifications are not configured yet.' });
  }

  const subject = `New Rooted Renovations Lead: ${interest}`;
  const emailText = [
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

  const smsBody = [
    `Rooted Renovations Lead (${interest})`,
    `${name} | ${phone || 'No phone'}`,
    `${email}`,
    `${projectType} @ ${location}`
  ].join('\n');

  const attempts = [];

  if (smtpTransporter) {
    attempts.push(
      smtpTransporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.LEAD_TO_EMAIL,
        replyTo: email,
        subject,
        text: emailText
      })
    );
  }

  if (smsClient) {
    attempts.push(
      smsClient.messages.create({
        from: process.env.TWILIO_FROM_NUMBER,
        to: process.env.LEAD_TO_SMS,
        body: smsBody
      })
    );
  }

  const results = await Promise.allSettled(attempts);
  const hasSuccess = results.some((result) => result.status === 'fulfilled');

  if (!hasSuccess) {
    return res.status(500).json({ error: 'Unable to send lead notification. Please verify SMTP/Twilio settings.' });
  }

  return res.status(200).json({
    success: true,
    emailSent: Boolean(smtpTransporter),
    smsSent: Boolean(smsClient)
  });
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, async () => {
  console.log(`Rooted Renovations site running on http://localhost:${port}`);

  if (smtpTransporter) {
    try {
      await smtpTransporter.verify();
      console.log('SMTP transport verified.');
    } catch (error) {
      console.error('SMTP verify failed:', error.message);
    }
  } else {
    console.warn('SMTP disabled: missing one or more SMTP_* env vars.');
  }

  if (smsClient) {
    console.log('SMS notifications enabled via Twilio.');
  } else {
    console.warn('SMS disabled: missing Twilio env vars.');
  }
});
