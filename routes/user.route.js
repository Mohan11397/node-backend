const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const {
  createUser,
  getUser,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Define the routes
router.post("/", upload.single("profileImage"), createUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/me", auth, getUser);

module.exports = router;
