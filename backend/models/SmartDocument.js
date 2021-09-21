const mongoose = require("mongoose");

const SmartDocumentSchema = mongoose.Schema({
  file: String,
  typeDocument: String,
  path: String,
  name: String,
  user: String,
});

module.exports = mongoose.model(
  "SmartDocument",
  SmartDocumentSchema,
  "smartDocument"
);