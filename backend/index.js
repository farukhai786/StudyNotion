const express = require("express");
const app = express();

const userRoutes = require('./Routes/User')
const profileRoutes = require('./Routes/Profile')
const paymentRoutes = require('./Routes/Payment')
const courseRoutes = require('./Routes/Course')

 const {cloudinaryConnect} = require("./Config/Cloudinary")
const database = require('./Config/database');
const cookieParser = require("cookie-parser");
 const cors = require ("cors");

  // const fileUpload = require("express-fileupload");

  
const dotenv = require("dotenv"); 

console.log("🔍 RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("🔍 RAZORPAY_SECRET:", process.env.RAZORPAY_SECRET);
console.log("⚡ API routes mounted at /api/v1");
  dotenv.config();
 const PORT =  process.env.PORT || 4000;

database.connect();

app.use(express.json());
app.use(express.urlencoded({ limit: '1gb', extended: true }));
app.use(cookieParser());

origin: function (origin, callback) {
  console.log("Origin:", origin); // देखिए कौन सा URL आ रहा है
  const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"];
  if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
    callback(null, true);
  } else {
    callback(new Error('Not allowed by CORS'));
  }
}

  
// app.use(
//     fileUpload({
//         useTempFiles:true,
//         tempFileDir:"/tmp"
//     })
// )

  cloudinaryConnect();

app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/Profile",profileRoutes)
app.use("/api/v1/course",courseRoutes)
app.use("/api/v1/payment",paymentRoutes)

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running",
    })
})


app.use((err, req, res, next) => {
  console.error("❌ Global Error Handler:", err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, ()=>{
     console.log(`app is running at ${PORT}`)
})
