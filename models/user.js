const mongoose = require('mongoose');
var passportlocalmongoose=require("passport-local-mongoose");
var passportlocalmongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String, 
    required: true, 
    unique: true, 
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
},
  password: {
    type: String,
    required: true
  },
  manager: {
    type: Boolean 
  },
  token: {
    type: String 
  },
  token_expiration_time: {
    type: String 
  },
  permission: {
    type: Boolean 
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  last_access: {
    type: Date
  }

});

UserSchema.plugin(passportlocalmongoose);

module.exports=mongoose.model("User", UserSchema);

const User = mongoose.model('user', UserSchema);

module.exports = User;
