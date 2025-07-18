// /Mail/Templete/courseEnrollmentEmail.js

exports.courseEnrollmentTemplate = (name, courseName, dashboardLink) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Course Enrollment Confirmation</title>
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
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 15px;
          text-align: center;
        }
        .highlight {
          font-weight: bold;
          color: #f9a825;
        }
        .support {
          margin-top: 30px;
          font-size: 14px;
          color: #555;
          text-align: center;
        }
        a.button {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #fdd835;
          color: black;
          text-decoration: none;
          font-weight: bold;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <a href="https://studynotion-edtech-project.vercel.app">
          <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo" />
        </a>

        <div class="message">Course Enrollment Confirmation</div>

        <div class="body">
          <p>Hey ${name},</p>
          <p>
            Congratulations! You have successfully enrolled in the course 
            <span class="highlight">"${courseName}"</span>.
          </p>
          <p>
            Click the button below to go to your learning dashboard and start learning:
          </p>

          <div style="text-align: center;">
            <a href="${dashboardLink}" class="button">Go to Dashboard</a>
          </div>
        </div>

        <div class="support">
          If you have any questions or need further assistance,<br />
          please feel free to reach out to us at 
          <a href="mailto:info@studynotion.com">info@studynotion.com</a>.<br />
          We are here to help!
        </div>
      </div>
    </body>
  </html>
  `;
};
