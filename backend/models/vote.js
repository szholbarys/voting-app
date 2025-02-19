const mongoose = require("mongoose");

const MemeSchema = new mongoose.Schema({
  url: { type: String, required: true },
  title: { type: String },
});

module.exports = mongoose.model("Meme", MemeSchema);
