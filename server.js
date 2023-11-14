console.clear();

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");

const app = express();
const port = 3000;

app.use("/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI).catch((err) => console.log(err));
app.listen(port, () => console.log(`Server listening on port ${port}`));
