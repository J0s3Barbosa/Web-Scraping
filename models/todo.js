const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var TodoSchema = new Schema({
  Task: {
    type: String,
    required: true
  },
  Completed: {
    type: Boolean,
    default: false
  },
  Owner: {
    type: String
  },
  Created_At: {
    type: Date,
    default: Date.now
  },
  Last_Updated_At: {
    type: Date,
  }
});
module.exports = mongoose.model("Todo", TodoSchema);
