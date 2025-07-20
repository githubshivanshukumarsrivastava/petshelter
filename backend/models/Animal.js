const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String },
  image: { type: String },
  description: { type: String },
  location: { type: String },
  age: { type: String },
  history: { type: String }
});

module.exports = mongoose.model("Animal", animalSchema);
