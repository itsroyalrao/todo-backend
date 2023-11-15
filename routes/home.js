import express from "express";
import { home } from "../controllers/home.js";

const router = express.Router();

router.route("/").post(home);

export default router;
