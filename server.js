console.clear();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.get("/", (req, res) => res.json({ msg: "Mahadev" }));

(async () => {
  await mongoose
    .connect(
      "mongodb+srv://mohit:hPjYrJmEmFQ2HN9@nodeexpressprojects.t2ll3pf.mongodb.net/render?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connected to database..."))
    .catch((err) => console.log(err));
})();
app.listen(port, () => console.log(`Server listening on port ${port}`));
