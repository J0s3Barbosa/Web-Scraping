const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var ClashSchema = new Schema({
  Name: {
    type: String,
    required: true
  },
  Started_Trophies: {
    type: Number,
    required: true
  },
  Trophies: {
    type: Number,
    required: true
  },
  Victory: {
    type: Number,
    required: true
  },
  Defeat: {
    type: Number
  },
  Owner: {
    type: String
  },
  Total_Trophies: {
    type: Number

  },
  Played_at: {
    type: Date,
    default: Date.now
  }
});
// module.exports = ClashSchema;
module.exports = mongoose.model("clashroyale", ClashSchema);
