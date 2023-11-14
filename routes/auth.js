import express from "express";
import { signup, login } from "../controllers/auth.js";
const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(signup);

export default router;
