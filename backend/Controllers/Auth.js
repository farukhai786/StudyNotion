const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../Models/User");
const OTP = require("../Models/Otp");
const Profile = require("../Models/Profile");
const {mailSender} = require("../Utils/mailSendar");



exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    let otp;
    let exists;
    do {
      otp = otpGenerator.generate(6, {
        digits: true,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      exists = await OTP.findOne({ otp });
    } while (exists);

    await OTP.create({ email, otp });
  
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("OTP send error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


exports.signUp = async (req, res) => {
  try {
    const {
      FirstName,
      LastName,
      email,
      password,
      confirmPassword,
      accountType,
      contectNumber,
      otp,
    } = req.body;

    if (!FirstName || !LastName || !email || !password || !confirmPassword || !otp) {
      return res.status(403).json({ success: false, message: "All fields are required" });
    }
    console.log(accountType);
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Passwords do not match" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "User already registered" });
    }

    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    if (recentOtp.length === 0 || otp !== recentOtp[0].otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contectNumber: contectNumber || null,
    });

    const user = await User.create({
      FirstName,
      LastName,
      email,
      password: hashedPassword,
      accountType,
      contectNumber,
      additionalDetails: profileDetails._id,
    });
  
    res.status(200).json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    console.error("Sign Up Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "User registration failed ",    
      
     });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    const payload = { email: user.email, id: user._id, accountType: user.accountType };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

    user.Token = token;
    user.password = undefined;

    res.cookie("token", token, {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    }).status(200).json({ success: true, token, user, message: "Logged in successfully" });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};


exports.changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword,  } = req.body;

    if (!oldPassword || !newPassword ) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

   

    const user = await User.findById(userId);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Old password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    await mailSender(
      user.email,
      "Password Changed Successfully",
      `<p>Hello ${user.FirstName},<br>Your password has been successfully updated.<br>If this wasn't you, please contact support immediately.</p>`
    );

    res.status(200).json({ success: true, message: "Password changed successfully" });

  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ success: false, message: "Password change failed" });
  }
};

