const express = require("express");
const { signup } = require("../controllers/auth");
const router = express.Router();

router.route("/signup").get(signup);

module.exports = router;
