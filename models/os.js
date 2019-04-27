const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var OsSchema = new Schema({
 
  id_OS: {
    type: Number,
    required : true
  },
  id_equipamento: {
    type: Number,
    required : true
  },
  id_func: {
    type: Number,
  },
  texto_defeito: {
    type: String,
    required : true
  },
  texto_realizado: {
    type: String,
  },
  os_status: {
    type: String,
  },
  dh_criacao: {
    type: Date,
    default: Date.now
  }
  ,
  dh_inicio: {
    type: Date,
  }
  ,
  dh_fm: {
    type: Date,
  }
  
});
module.exports = mongoose.model("Os", OsSchema);
/*
id_OS: 
id_equipamento: 
id_func: 
texto_defeito: 
texto_realizado: 
dh_criacao: 
dh_inicio: 
dh_fm: 
*/