const mongoose = require('mongoose');
var passportlocalmongoose=require("passport-local-mongoose");
var UserSchema=mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

UserSchema.plugin(passportlocalmongoose);
module.exports=mongoose.model("User", UserSchema);

