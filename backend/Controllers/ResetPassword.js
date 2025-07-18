
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../Models/User");
const {mailSender} = require("../Utils/mailSendar");
const resetPasswordTemplate = require("../Mail/Templete/passwordUpdate");
const ExpressError = require("../Utils/ExpressError");
// ======================== FORGOT PASSWORD ========================
exports.resetPasswordToken = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    throw new ExpressError(400, "Email is required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ExpressError(404, "User not found");
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expires = Date.now() + 15 * 60 * 1000;

  user.Token = token;
  user.resetPasswordExpires = expires;
  await user.save();

  const url = `http://localhost:5173/reset-password/${token}`;
  const emailContent = resetPasswordTemplate(user.name, url);

  await mailSender(email, "Reset Your Password", emailContent);

  res.status(200).json({
    success: true,
    message: "Password reset link sent",
  });
};


// ======================== RESET PASSWORD ========================
exports.resetPassword = async (req, res, next) => {
  const { token, password, confirmPassword } = req.body;

  if (!token || !password || !confirmPassword) {
    throw new ExpressError(400, "All fields are required");
  }

  if (password !== confirmPassword) {
    throw new ExpressError(400, "Passwords do not match");
  }

  const user = await User.findOne({
    Token: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new ExpressError(400, "Invalid or expired token");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.Token = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successful",
    email: user.email,
  });
};

