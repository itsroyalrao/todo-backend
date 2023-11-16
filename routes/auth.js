import express from "express";
import {
  signup,
  login,
  logout,
  status,
  resetPassword,
  changePassword,
} from "../controllers/auth.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/status").post(status);
router.route("/resetPassword").post(resetPassword);
router.route("/changePassword").post(changePassword);

export default router;
