// user.js
const Mongoose = require("mongoose")
const UserSchema = new Mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 3,
    required: true,
  },
  eMail: {
    type: String,
    unique: true,
    required: true,
  },
})


module.exports=Mongoose.model('user',UserSchema)