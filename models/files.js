
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var FileSchema = new Schema({
 
    path: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    }

});
module.exports = mongoose.model("File", FileSchema);
 