const multer = require("multer");

function uploadController(req, res) {
  res.send("Uploaded successfully");
}

module.exports = { uploadController };
