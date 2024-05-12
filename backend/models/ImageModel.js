const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageName: String,
  imageData: String
});

module.exports = mongoose.model('Image', imageSchema);
