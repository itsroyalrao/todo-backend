const Auth = require("../models/auth");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await Auth.findOne({ email: email });
    if (user) {
      res.json({ success: false, msg: "User already exists" });
    } else {
      await Auth.create({ name, email, password });
      res.json({ success: true });
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = { signup };
