// /home/rijalgemink/Documents/Javascript/project/api/send-email.js
// (Sesuaikan path ini jika Anda menggunakan struktur folder lain untuk API/functions)

import nodemailer from 'nodemailer';

// Fungsi untuk membuat template HTML email
function createEmailHtml(data) {
  const primaryColor = '#7C3AED'; // Sesuaikan dengan warna primer portofolio Anda (misal: purple-600)
  const backgroundColor = '#f4f7f6';
  const textColor = '#333333';
  const cardBackgroundColor = '#ffffff';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body { margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: ${textColor}; background-color: ${backgroundColor}; }
    .container { max-width: 600px; margin: 20px auto; padding: 0; background-color: ${cardBackgroundColor}; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); overflow: hidden; }
    .header { background-color: ${primaryColor}; color: #ffffff; padding: 25px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; font-weight: bold; }
    .content { padding: 25px 30px; }
    .content p { margin-bottom: 15px; font-size: 16px; }
    .field { margin-bottom: 20px; padding: 15px; background-color: #f9f9f9; border-left: 5px solid ${primaryColor}; border-radius: 4px; }
    .field-label { font-weight: bold; display: block; margin-bottom: 8px; color: #555555; font-size: 14px; text-transform: uppercase; }
    .message-block { white-space: pre-wrap; word-wrap: break-word; font-size: 16px; line-height: 1.7; }
    .footer { text-align: center; margin-top: 25px; padding: 20px; font-size: 12px; color: #777777; background-color: #eeeeee; border-top: 1px solid #dddddd;}
    a { color: ${primaryColor}; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Message from Your Portfolio</h1>
    </div>
    <div class="content">
      <p>You have received a new message through your portfolio contact form. Here are the details:</p>
      
      <div class="field">
        <span class="field-label">Name:</span>
        <span>${data.name}</span>
      </div>
      
      <div class="field">
        <span class="field-label">Email:</span>
        <span><a href="mailto:${data.email}">${data.email}</a></span>
      </div>
      
      <div class="field">
        <span class="field-label">Subject:</span>
        <span>${data.subject}</span>
      </div>
      
      <div class="field">
        <span class="field-label">Message:</span>
        <div class="message-block">${data.message}</div>
      </div>
    </div>
    <div class="footer">
      <p>This email was sent from the contact form on your portfolio website.</p>
    </div>
  </div>
</body>
</html>
  `;
}

// Handler untuk fungsi serverless (contoh untuk Vercel/Next.js)
// Jika menggunakan Netlify Functions atau platform lain, sesuaikan struktur handler-nya
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  console.log('[API /api/send-email] Received data:', { name, email, subject, message_preview: message.substring(0, 50) + '...' });
  console.log('[API /api/send-email] Environment Vars Check:');
  console.log('  EMAIL_HOST:', process.env.EMAIL_HOST ? 'Set' : 'NOT SET');
  console.log('  EMAIL_PORT:', process.env.EMAIL_PORT ? 'Set' : 'NOT SET');
  console.log('  EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'NOT SET');
  console.log('  EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set (hidden)' : 'NOT SET');
  console.log('  RECIPIENT_EMAIL:', process.env.RECIPIENT_EMAIL ? 'Set' : 'NOT SET');
  console.log('  EMAIL_SECURE:', process.env.EMAIL_SECURE);

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    logger: true,
    debug: true,
  });

  console.log('[API /api/send-email] Transporter configured. Preparing mail options...');
  const mailOptions = {
    from: `"${name} via Portfolio" <${process.env.EMAIL_USER}>`,
    replyTo: email,
    to: process.env.RECIPIENT_EMAIL,
    subject: `New Contact Form Message: ${subject}`,
    html: createEmailHtml({ name, email, subject, message }),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('[API /api/send-email] Email sent successfully via Nodemailer.');
    return res.status(200).json({ message: 'Message sent successfully from API!' });
  } catch (error) {
    console.error('!!! [API /api/send-email] CRITICAL ERROR sending email:', error);
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    console.error('Error Code (Nodemailer):', error.code);
    console.error('Error Response Code (Nodemailer):', error.responseCode);
    console.error('Error Stack:', error.stack);
    return res.status(500).json({ message: 'Failed to send message due to a server error. Check server logs.' });
  }
}