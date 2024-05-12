const express = require('express');
const multer = require('multer');
const { handleFileUpload, getImages } = require('../controllers/fileUploadController');

const router = express.Router();

// Set up storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), handleFileUpload);
router.get('/images', getImages);

module.exports = router;
