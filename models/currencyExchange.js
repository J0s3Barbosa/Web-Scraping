const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var currencyExchangeSchema = new Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  value: {
    type: Number,
  },
  requestedAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model("currencyExchange", currencyExchangeSchema);
