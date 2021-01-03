let multer = require("multer");
const path = require("path");

// * Storage settings
const storage = multer.diskStorage({
  destination: (req, res, callback) => {
    // ? Setting destination folder
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    // ? Generating filename
    callback(null, new Date().toISOString() + file.originalname)
  }
});

// * File filtering settings
const fileFilter = (req, file, callback) => {
  // ? Supported audio types
  if (
    file.mimetype === "audio/mpeg" ||
    file.mimetype === "audio/wave" ||
    file.mimetype === "audio/wav" ||
    file.mimetype === "audio/mp3"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
}


// * Exporting configuration
exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter,
});