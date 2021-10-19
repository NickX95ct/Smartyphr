const mongoose = require("mongoose");

const BonificiSchema = mongoose.Schema({
  identifyUser: String,
  filename: String,
  dateupload: Date,
  note: String,
});

module.exports = mongoose.model(
  "Bonifici",
  BonificiSchema,
  "bonifici"
);
