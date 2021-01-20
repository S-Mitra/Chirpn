const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  title : { type: String, required: true},
  content : { type: String, required: true},
  creator : {type: mongoose.Schema.Types.ObjectId, require: true, ref: "User"}
});

module.exports = mongoose.model( "ToDo", todoSchema);
