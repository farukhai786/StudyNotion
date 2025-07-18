// const mongoose = require('mongoose');
// require('dotenv').config();

// exports.connect = () =>
//   mongoose.connect(process.env.MONGO_URL)
    
 

 
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch(err => {
//     console.error('DB error:', err.message);
//     process.exit(1);
//   });




const mongoose = require('mongoose');

exports.connect = () =>
  mongoose.connect("mongodb://localhost:27017/StudyNotion")  // यहाँ direct MongoDB URI लिखा है
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
      console.error('DB error:', err.message);
      process.exit(1);
    });
