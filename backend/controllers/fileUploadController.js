const Image = require('../models/ImageModel');

exports.handleFileUpload = async (req, res) => {
  const newImage = new Image({
    imageName: req.file.filename,
    imageData: req.file.path
  });

  try {
    await newImage.save();
    res.status(201).send('File uploaded successfully');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
