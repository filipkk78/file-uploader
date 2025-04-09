const cloudinary = require("../cloudinaryConfig");
const upload = require("../middleware/multer");

function uploadController(req, res) {
  cloudinary.uploader.upload(req.file.path, function (err, result) {
    if (err) {
      res.render("file-form", { err: err, user: req.user });
      return;
    }
    console.log(result);
    res.redirect("/");
  });
}

module.exports = { uploadController };
