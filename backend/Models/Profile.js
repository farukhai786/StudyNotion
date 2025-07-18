const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfileShema = new Schema({
 
    gender:{
        type:String,
    },
     dateOfBirth:{
        type:String,
    },

     about:{
        type:String,
        trim:true
    },
     contactNumber:{
        type:Number,
    }
})


module.exports = mongoose.model('Profile', ProfileShema);
