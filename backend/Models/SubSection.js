const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubSectionSchema = new Schema({
 
  title:{
    type:String,

  },
  description:{
    type:String,
  },
  videoUrl:{
    type:String,
  },
   timeDuration: {
  type: Number,
  required: true,
}

});


module.exports = mongoose.model('SubSection', SubSectionSchema);
