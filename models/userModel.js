const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
     username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false
    },
    address: {
      type: String,
      default: ""
    },

})

const userModel = mongoose.model('users1' , userSchema)

module.exports = userModel