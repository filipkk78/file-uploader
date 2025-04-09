const cloudinary = require("../cloudinaryConfig");
const upload = require("../middleware/multer");
const db = require("../prisma/queries");

function uploadController(req, res) {
  cloudinary.uploader.upload(req.file.path, function (err, result) {
    if (err) {
      res.render("file-form", { err: err, user: req.user });
      return;
    }
    db.addFile(
      parseInt(req.body.folderId),
      result.original_filename,
      result.secure_url,
      result.bytes
    );
    res.redirect("/");
  });
}

module.exports = { uploadController };
