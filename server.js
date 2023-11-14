import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*",
    methods: "*",
  })
);
app.use(express.json());

app.use("/auth", authRoutes);

const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI).catch((err) => console.log(err));
app.listen(port, () => console.log(`Server listening on port ${port}`));
