// const mongoose = require('mongoose');
// require('dotenv').config();

// exports.connect = () =>
//   mongoose.connect(process.env.MONGO_URL)
    
 

 
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch(err => {
//     console.error('DB error:', err.message);
//     process.exit(1);
//   });




const mongoose = require("mongoose");
const dotenv = require("dotenv");


dotenv.config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)  
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
      console.error('DB error:', err.message);
      process.exit(1);
    });
};

