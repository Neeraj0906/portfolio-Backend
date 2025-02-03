// contact.js
const express = require('express');
const sgMail = require('@sendgrid/mail');
const router = express.Router();

// Set SendGrid API Key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// POST route to handle contact form submission
router.post('/', (req, res) => {
  const { name, email, message } = req.body;

  const msg = {
    to: 'your-email@example.com', // your email address where the form data will be sent
    from: email, // sender's email address (user email)
    subject: 'New Contact Form Submission',
    text: `You have a new contact form submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
      res.json({ message: 'Contact form submitted successfully' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Failed to send email' });
    });
});

module.exports = router;
