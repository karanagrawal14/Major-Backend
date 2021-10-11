const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UsersSchema = new Schema({
    name:{
        type:String
    },
  email: {
    type: String
  },
  password:{
    type:String
  },
  role:{
      type:String
  },
}, {
    collection: 'users'
  })

module.exports = mongoose.model('Users',UsersSchema)