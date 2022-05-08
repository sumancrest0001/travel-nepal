const nodemailer = require('nodemailer');

const sendMail = async (options) => {
  // Create a transporter

  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 25,
    auth: {
      user: '204fb026693f20',
      pass: '96f01934dcb6df',
    },
  });

  const mailOptions = {
    from: 'Suman Shrestha <suman.crest0001@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
