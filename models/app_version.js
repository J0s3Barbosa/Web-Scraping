
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var AppVersionSchema = new Schema({
 
    version: {
        type: Number,
        required: true
    },
    Deployed_at: {
        type: Date,
        default: Date.now
      }

});
module.exports = mongoose.model("AppVersion", AppVersionSchema);
 