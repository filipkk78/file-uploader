const cloudinary = require("../cloudinaryConfig");
const upload = require("../middleware/multer");
const db = require("../prisma/queries");

async function uploadController(req, res) {
  cloudinary.uploader.upload(req.file.path, async function (err, result) {
    if (err) {
      res.render("file-form", { err: err, user: req.user });
      return;
    }
    await db.addFile(
      parseInt(req.body.folderId),
      result.original_filename,
      result.secure_url,
      result.bytes
    );
    res.redirect("/");
  });
}

module.exports = { uploadController };
