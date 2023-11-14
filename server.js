console.clear();

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const cors = require("cors");

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
