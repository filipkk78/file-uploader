const db = require("../prisma/queries");

async function detailsController(req, res) {
  const file = await db.getFileById(parseInt(req.params.fileId));
  if (req.user.id === file.userId) {
    res.render("file-details", {
      file: {
        name: file.name,
        size: file.size,
        createdAt: file.createdAt,
        link: file.link,
      },
      user: req.user,
    });
  } else {
    res.render("access-denied", { user: req.user });
  }
}

module.exports = { detailsController };
