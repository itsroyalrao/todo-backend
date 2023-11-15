import bcrypt from "bcrypt";
import Auth from "../models/auth.js";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await Auth.findOne({ email: email });
    if (user) {
      return res.json({ success: false, message: "User already exists" });
    } else {
      bcrypt.hash(password, 10, async (err, encrypted) => {
        if (err) console.log(err);

        await Auth.create({ name, email, password: encrypted });
      });
      return res.json({ success: true });
    }
  } catch (e) {
    console.log(e);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, async (err, same) => {
        if (err) console.log(err);
        else if (same) {
          await Auth.findOneAndUpdate({ email: email }, { loggedIn: true });
          return res.json({ success: true });
        } else
          return res.json({
            success: false,
            message: "Password is incorrect!",
          });
      });
    } else
      return res.json({
        success: false,
        message: "User doesn't exist!",
      });
  } catch (e) {
    console.log(e);
  }
};

const logout = async (req, res) => {
  try {
    const { email } = req.body;
    await Auth.findOneAndUpdate({ email: email }, { loggedIn: false });

    return res.json({ success: true });
  } catch (e) {
    console.log(e);
  }
};

const status = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Auth.findOne({ email });
    console.log(user);

    return res.json({ success: true, logStatus: user.loggedIn });
  } catch (e) {
    console.log(e);
  }
};

export { signup, login, logout, status };
