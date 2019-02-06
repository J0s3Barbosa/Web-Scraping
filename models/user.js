const mongoose = require("mongoose");  
// const bcrypt = require("bcrypt");  
const bcrypt = require('bcryptjs');
  
const userSchema = mongoose.Schema({  
    local: {  
        username: String,  
        password: String  
    }  
});  
  
userSchema.methods.generateHash = function(password){  
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));  
};  
  
userSchema.methods.validPassword = function(password){  
    return bcrypt.compareSync(password, this.local.password);  
}  
  
var User = mongoose.model("userdetails", userSchema);  
module.exports = User;  
