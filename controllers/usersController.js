const db = require("../prisma/queries")
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const validateSignUp = [
  body("name")
    .trim()
    .isAlpha()
    .withMessage("Name must be alphanumerical")
    .isLength({ max: 50 })
    .withMessage("Name can't be longer than 50 characters"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must be a valid email address")
    .custom(async (value) => {
      const user = await db.getUserByEmail(value);
      if (user) {
        throw new Error("Email is already taken");
      }
      return true;
    }),
  body("password")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error("Passwords must match");
      }
      return true;
    }),
];

exports.signUp = [
  validateSignUp,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.set("Content-Type", "text/html");
      return res.status(400).render("sign-up-form", {
        errors: errors.array(),
      });
    }
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.signUp(name, email, hashedPassword);
      res.redirect("/");
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
];