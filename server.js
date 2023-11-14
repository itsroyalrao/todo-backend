console.clear();

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.get("/", (req, res) => res.json({ msg: "Mahadev" }));

mongoose.connect(process.env.MONGO_URI).catch((err) => console.log(err));
app.listen(port, () => console.log(`Server listening on port ${port}`));
