const mongoose = require('mongoose');
const {mailSender} = require("../Utils/mailSendar");
const Schema = mongoose.Schema;
const {otpEmailTemplate} = require("../Mail/Templete/emailVerificationTemplate")
const OTPSchema = new Schema({
 
  email:{
    type:String,
    required:true,
  },
  otp:{
    type: String,
    required:true,
  },
 createdAt:{
     type: Date,
    expires: 5*50,
    default: Date.now,
 }

});

// async function sendVerificationEmail(email, otp) {
//   try {
//     const mailResponse = await mailSender(
//       email,
//       "Verification Email from StudyNotation",
//       `<p>Your OTP is <b>${otp}</b>. It is valid for 5 minutes.</p>`
//     );
//     console.log("Mail sent successfully:", mailResponse.messageId);
//   } catch (error) {
//     console.log("Error occurred while sending email:", error);
//   }
// }

// OTPSchema.pre("save", async function (next) {
//   await sendVerificationEmail(this.email, this.otp);
//   next();
// })

// module.exports = {
//   OTP: mongoose.model('OTP', OTPSchema),
//   sendVerificationEmail,
// };

async function sendVerificationEmail(email, otp) {
  try {
    const htmlBody = otpEmailTemplate(otp);
    const mailResponse = await mailSender(
      email,
      "OTP Verification",
      htmlBody
    );
    console.log("Mail sent successfully:", mailResponse.messageId);
  } catch (error) {
    console.log("Error occurred while sending email:", error);
  }
}


OTPSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
})

module.exports = mongoose.model('OTP', OTPSchema);