const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var dhtSchema = new Schema({
  
  temperature: {
    type: String,
    required: true
  },
  humidity: {
    type: String,
    required: true
  },
 
  postedAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("dht", dhtSchema);
