exports.paymentSuccessEmailTemplate = ({ username, courseName, paymentId, amount }) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Payment Successful</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f9f9f9;
          color: #333;
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
        .title {
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 10px;
        }
        .content {
          font-size: 16px;
          margin-top: 20px;
          line-height: 1.6;
        }
        .highlight {
          font-weight: bold;
          color: #4CAF50;
        }
        .footer {
          margin-top: 30px;
          font-size: 14px;
          text-align: center;
          color: #777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <a href="https://studynotion-edtech-project.vercel.app">
          <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo" />
        </a>

        <div class="title">Payment Successful</div>

        <div class="content">
          <p>Hi <strong>${username}</strong>,</p>
          <p>Thank you for purchasing the <span class="highlight">${courseName}</span> course on <strong>StudyNotion</strong>.</p>
          <p>Your payment was successful!</p>
          <p><strong>Payment ID:</strong> ${paymentId}</p>
          <p><strong>Amount Paid:</strong> ₹${amount}</p>
          <p>You now have full access to the course content.</p>
        </div>

        <div class="footer">
          If you have any questions, feel free to contact us at 
          <a href="mailto:info@studynotion.com">info@studynotion.com</a>
        </div>
      </div>
    </body>
  </html>
  `;
};
