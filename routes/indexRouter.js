const { Router } = require("express");
const indexRouter = Router();
const passport = require("../passportConfig");
const { signUp } = require("../controllers/usersController");
const { uploadController } = require("../controllers/uploadController");
const {
  addNewFolder,
  deleteFolder,
  updateFolder,
} = require("../controllers/folderController");
const { detailsController } = require("../controllers/detailsController");
const upload = require("../middleware/multer");

indexRouter.get("/", (req, res) => res.render("index", { user: req.user }));

indexRouter.get("/upload", (req, res) =>
  res.render("file-form", { user: req.user })
);

indexRouter.post("/upload", upload.single("newFile"), uploadController);

indexRouter.get("/log-in", (req, res) => {
  const messages = req.session.messages;
  req.session.messages = [];
  res.render("log-in.ejs", { user: req.user, errors: messages });
});

indexRouter.get("/sign-up", (req, res) => res.render("sign-up-form"));

indexRouter.post("/sign-up", signUp);

indexRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
    failureMessage: true,
  })
);

indexRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

indexRouter.get("/details/:fileId", detailsController);

indexRouter.post("/newfolder", addNewFolder);
indexRouter.post("/deletefolder", deleteFolder);
indexRouter.post("/updatefolder", updateFolder);

module.exports = indexRouter;
