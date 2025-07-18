 exports.otpEmailTemplate = ( otp ) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>OTP Verification</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          color: #333;
          background-color: #f9f9f9;
        }
        .container {
          max-width: 600px;
          margin: auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
        }
        .logo {
          height: 40px;
          display: block;
          margin: 0 auto 20px;
        }
        .message {
          font-size: 22px;
          font-weight: bold;
          margin-bottom: 15px;
          text-align: center;
        }
        .otp {
          font-size: 32px;
          font-weight: bold;
          color: #4CAF50;
          text-align: center;
          margin: 20px 0;
        }
        .support {
          margin-top: 30px;
          font-size: 14px;
          color: #555;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <a href="https://studynotion-edtech-project.vercel.app">
          <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo" />
        </a>

        <div class="message">OTP Verification Email</div>

        <div class="body">
          <p>Hi Dear User</p>
          <p>Thank you for registering with <strong>StudyNotion</strong>.</p>
          <p>Use the OTP below to verify your account. It is valid for 5 minutes.</p>

          <div class="otp">${otp}</div>
        </div>

        <div class="support">
          If you didn’t request this, you can safely ignore this email.<br/>
          Need help? Email us at <a href="mailto:info@studynotion.com">info@studynotion.com</a>
        </div>
      </div>
    </body>
  </html>
  `;
};



