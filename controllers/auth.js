import Auth from "../models/auth.js";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await Auth.findOne({ email: email });
    if (user) {
      res.json({ success: false, message: "User already exists" });
    } else {
      bcrypt.hash(password, 10, async (err, encrypted) => {
        if (err) console.log(err);

        await Auth.create({ name, email, password: encrypted });
      });
      res.json({ success: true });
    }
  } catch (e) {
    console.log(e);
  }
};

export { signup };
