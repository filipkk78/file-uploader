const { Router } = require("express");
const indexRouter = Router();
const passport = require("../passportConfig");
const { signUp } = require("../controllers/usersController");
const multer = require("multer");
const { uploadController } = require("../controllers/uploadController");
const {
  addNewFolder,
  deleteFolder,
  updateFolder,
} = require("../controllers/folderController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

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

indexRouter.post("/newfolder", addNewFolder);
indexRouter.post("/deletefolder", deleteFolder);
indexRouter.post("/updatefolder", updateFolder);

module.exports = indexRouter;
