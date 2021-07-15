const { request } = require("express");
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.json({ message: "bienvenue dans la galere" });
});
router.post("/signup", userController.signup);

module.exports = router;
