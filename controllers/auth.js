const Auth = require("../models/auth");

const signup = async (req, res) => {
  try {
    console.log(req.body);
    res.json({ success: true });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { signup };
