require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});






// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend_transaction" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};


 
const sendRegistrationEmail = async (userEmail, name) => {
  const subject = "Welcome to Backend Transaction! 🎉";

  const text = `
Hello ${name},

Welcome to Backend Transaction!

Thank you for registering with us. Your account has been successfully created.

We're excited to have you on board!

Best regards,
Backend Transaction Team
  `;

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome to Backend Transaction</title>
  </head>

  <body style="
    margin: 0;
    padding: 0;
    background-color: #f4f7fb;
    font-family: Arial, Helvetica, sans-serif;
  ">
    <table
      role="presentation"
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="background-color: #f4f7fb; padding: 40px 12px;"
    >
      <tr>
        <td align="center">

          <table
            role="presentation"
            width="100%"
            cellspacing="0"
            cellpadding="0"
            style="
              max-width: 600px;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
            "
          >

            <!-- Header -->
            <tr>
              <td style="
                background-color: #2563eb;
                padding: 35px 25px;
                text-align: center;
                color: #ffffff;
              ">
                <h1 style="
                  margin: 0;
                  font-size: 28px;
                ">
                  Backend Transaction
                </h1>

                <p style="
                  margin: 10px 0 0;
                  font-size: 15px;
                  color: #dbeafe;
                ">
                  Secure. Simple. Reliable.
                </p>
              </td>
            </tr>

            <!-- Email Content -->
            <tr>
              <td style="
                padding: 35px 30px;
                color: #334155;
                font-size: 15px;
                line-height: 1.8;
              ">
                <h2 style="
                  margin-top: 0;
                  color: #0f172a;
                  font-size: 24px;
                ">
                  Welcome aboard, ${name}!
                </h2>

                <p>
                  🎉 Congratulations! Your registration was successful.
                </p>

                <p>
                  Thank you for joining
                  <strong>Backend Transaction</strong>.
                  We're happy to have you as part of our community.
                </p>

                <p>
                  Your account has been created successfully, and
                  you're ready to get started.
                </p>

                

                 

                <p style="margin-bottom: 0;">
                  Best regards,<br />
                  <strong>Backend Transaction Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="
                padding: 22px;
                text-align: center;
                background-color: #f8fafc;
                color: #64748b;
                font-size: 12px;
                line-height: 1.7;
              ">
                <p style="margin: 0;">
                  © ${new Date().getFullYear()} Backend Transaction.
                  All rights reserved.
                </p>

                <p style="margin: 5px 0 0;">
                  This is an automated registration confirmation email.
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  await sendEmail(userEmail, subject, text, html);
};

 


module.exports = {
    // sendEmail,
    sendRegistrationEmail
}