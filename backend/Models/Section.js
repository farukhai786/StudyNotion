const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SectionSchema= new Schema({
 
  sectionName:{
    type:String,

  },
  subSection:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:"SubSection",
  }],


});


module.exports = mongoose.model('Section', SectionSchema);
