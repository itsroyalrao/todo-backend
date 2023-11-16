import nodemailer from "nodemailer";
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
    if (user) return res.json({ success: true, logStatus: user.loggedIn });
    else return res.json({ success: true, logStatus: false });
  } catch (e) {
    console.log(e);
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await Auth.findOne({ email: email });

  if (user) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "my701319@gmail.com",
        pass: process.env.GMAIL_PASS,
      },
    });

    let message = {
      from: "my701319@gmail.com",
      to: email,
      subject: "Reset Password Link",
      html: `<h4>Click <a href="https://todo-v0.netlify.app/changePassword?email=${email}">Here</a> to change your password.</h4>`,
    };

    try {
      const info = await transporter.sendMail(message);
      if (info.accepted.length)
        return res.json({ success: true, msg: "Email is sent!" });
    } catch (e) {
      console.log(e);
      return res.json({ success: false, msg: "Error occured!" });
    }
  } else {
    return res.json({ success: false, msg: "User doesn't exists" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    bcrypt.hash(newPassword, 10, async (err, encrypted) => {
      if (err) console.log(err);

      await Auth.findOneAndUpdate({ email: email }, { password: encrypted });
      return res.json({ success: true, msg: "Password changed successfully!" });
    });
  } catch (e) {
    console.log(e.message);
  }
};

export { signup, login, logout, status, resetPassword, changePassword };
