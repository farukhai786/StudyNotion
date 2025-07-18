const resetPasswordTemplate = (name, resetLink) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Password Reset</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f3f3f3;
          color: #333;
          padding: 20px;
        }
        .container {
          background-color: #fff;
          max-width: 600px;
          margin: auto;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0px 0px 10px rgba(0,0,0,0.05);
        }
        .logo {
          display: block;
          margin: 0 auto 20px;
          height: 40px;
        }
        h2 {
          text-align: center;
          color: #f9a825;
        }
        p {
          font-size: 16px;
          line-height: 1.6;
        }
        .button {
          display: block;
          width: fit-content;
          margin: 20px auto;
          padding: 12px 24px;
          background-color: #f9a825;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: bold;
        }
        .footer {
          text-align: center;
          font-size: 14px;
          color: #777;
          margin-top: 30px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <a href="https://studynotion-edtech-project.vercel.app">
          <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo">
        </a>
        <h2>Reset Your Password</h2>
        <p>Hi ${name},</p>
        <p>You requested a password reset. Click the button below to reset your password:</p>

        <a class="button" href="${resetLink}">Reset Password</a>

        <p>This link will expire in 15 minutes. If you did not request this, you can safely ignore this email.</p>

        <div class="footer">
          Need help? Contact us at
          <a href="mailto:info@studynotion.com">info@studynotion.com</a>
        </div>
      </div>
    </body>
  </html>
  `;
};

module.exports = resetPasswordTemplate;
