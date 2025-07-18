const wrapAsync = require("../Utils/wrapAsync")
const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }
   console.log("👉 Incoming Headers:", req.headers);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add user data to request
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

exports.isStudent = (req, res, next) => {
 try {
     if (req.user.accountType !== "Student") {
    return res.status(403).json({
      success: false,
      message: "Access denied: Only students allowed",
    });
  }
  next();
 } catch (error) {
      return res.status(403).json({
      success: false,
      message: "User role can not be verified, Please try again",
    });
 }
};

exports.isInstructor = (req, res, next) => {
try {
  
    if (req.user.accountType !== "Instructor") {
    return res.status(403).json({
      success: false,
      message: "Access denied: Only instructors allowed",
      Instructor:req.user.accountType
    });
  }
  next();
} catch (error) {
     return res.status(403).json({
      success: false,
        message: "User role can not be verified, Please try again",
    });
}
};




exports.isAdmin = (req, res, next) => {
 try {
  
     if (req.user.accountType !== "Admin") {
    return res.status(403).json({
    success: false,
    message: "Access denied: Only admin allowed",
   
    
});

  }
  next();
 } catch (error) {
    return res.status(403).json({
      success: false,
       message: "User role can not be verified, Please try again",
       message:error.message
    });
 }
};
