const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookSchema = new Schema({
  name: {
    type: String
  },
  author:{
    type:String
  },
  pub_year:{
      type:Number
  },
  copies:{
      type:Number
  },
  times_issued:{
      type:Number
  },
  image:{
    type:Buffer,
    contentType:String
  },
  file:{
    type:Buffer
  }
}, {
    timestamps:true,
    collection: 'books'
  })

module.exports = mongoose.model('Books', bookSchema)