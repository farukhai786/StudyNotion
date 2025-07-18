const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
 

  FirstName: {
    type: String,
    required: true,
    trim: true,
  },
  LastName: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    
  },

  password: {
    type: String,
    required: true,
    
  },
   confirmPassword: {
    type: String,
    
    
  },

 

  createdAt: {
    type: Date,
    default: Date.now,
  },

  accountType : {
    type: String,
    enum:["Admin","Student","Instructor"],
     required:true
  },
    additionalDetails : {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"Profile"
  },
   courses : [{
  type: mongoose.Schema.Types.ObjectId,
  ref:"Course"
}],

  Token:{
    type: String,
  } ,
resetPasswordExpires: {
  type: Date
},

  image : {
     type:String,
     
  },
   courseProgress:[{
     type: mongoose.Schema.Types.ObjectId,
     ref:"courseProgres"
  }],

});

UserSchema.pre("save", function (next) {
  if (!this.image && this.FirstName && this.LastName) {
    const firstInitial = this.FirstName.charAt(0);
    const lastInitial = this.LastName.charAt(0);
    this.image = `https://ui-avatars.com/api/?name=${firstInitial}+${lastInitial}&background=0D8ABC&color=fff`;
  }
  next();
});


module.exports = mongoose.model('User', UserSchema);
