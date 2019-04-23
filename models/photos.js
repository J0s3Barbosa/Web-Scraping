
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PhotoSchema = new Schema({
    albumId: {
        type: Number,
    },
    id: {
        type: Number,
    },
    title: {
        type: String,
    },
    url: {
        type: String,
        required: true
    },
    thumbnailUrl: {
        type: String,
        required: true
    },

});
module.exports = mongoose.model("Photo", PhotoSchema);

/*
    "albumId": 1,
    "id": 1,
    "title": "accusamus beatae ad facilis cum similique qui sunt",
    "url": "https://via.placeholder.com/600/92c952",
    "thumbnailUrl": "https://via.placeholder.com/150/92c952"

*/