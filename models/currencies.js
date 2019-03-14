const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var currenciesSchema = new Schema({
  
  currencyName: {
    type: String,
    required: true
  },
  currencySymbol: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  requestedAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("currencies", currenciesSchema);
