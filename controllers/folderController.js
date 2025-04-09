const db = require("../prisma/queries");
// const { body, validationResult } = require("express-validator");

// const validateFolder = [
//   body("folderName")
//     .trim()
//     .isAlpha()
//     .withMessage("Name must be alphanumerical")
//     .isLength({ max: 50 })
//     .withMessage("Name can't be longer than 50 characters"),
// ];
function addNewFolder(req, res) {
  db.addFolder(req.body.folderName, req.user.id);
  res.redirect("/");
}

// exports.signUp = [
//   validateSignUp,
//   async (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.set("Content-Type", "text/html");
//       return res.status(400).render("/", {
//         errors: errors.array(),
//       });
//     }
//     try {
//         const { newFolder} = req.body;
//         db.addFolder(newFolder, req.user.id);
//   res.redirect("/");
//       const hashedPassword = await bcrypt.hash(password, 10);
//       await db.signUp(name, email, hashedPassword);
//       res.redirect("/");
//     } catch (error) {
//       console.error(error);
//       next(error);
//     }
//   },
// ];

module.exports = { addNewFolder };
