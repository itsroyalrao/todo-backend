const Auth = require("../models/auth");

const signup = async (req, res) => {
  try {
    console.log("hello mohit");
    res.json({ success: true });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { signup };
