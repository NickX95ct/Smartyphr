const mongoose = require("mongoose");

const FattureSchema = mongoose.Schema({
  paziente: String,
  filename: String,
  dateupload: Date,
  note: String,
});

module.exports = mongoose.model(
  "Fatture",
  FattureSchema,
  "fatture"
);
