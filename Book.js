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
  }
}, {
    collection: 'books'
  })

module.exports = mongoose.model('Books', bookSchema)