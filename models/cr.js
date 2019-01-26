const mongoose = require('mongoose');

const Schema = mongoose.Schema;
    
  var ClashSchema = new Schema({

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
    Played_at: {
        type: Date,
        default: Date.now
    }
});
// module.exports = ClashSchema;
module.exports = mongoose.model('clashroyale', ClashSchema)

