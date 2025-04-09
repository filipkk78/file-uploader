const db = require("../prisma/queries");

async function addNewFolder(req, res) {
  await db.addFolder(req.body.folderName, req.user.id);
  res.redirect("/");
}

async function deleteFolder(req, res) {
  await db.deleteFolder(parseInt(req.body.folderId));
  res.redirect("/");
}

async function updateFolder(req, res) {
  await db.updateFolder(
    parseInt(req.body.folderId),
    req.body.updatedFolderName
  );
  res.redirect("/");
}

module.exports = { addNewFolder, deleteFolder, updateFolder };
