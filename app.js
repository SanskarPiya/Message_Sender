const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(express.static("./public"));
app.use(express.json());

const data = [];

app.post("/api/message", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, response: "Invalid Message. Please try again." });
  }

  data.push(name);

  fs.writeFile(
    path.join(__dirname, "message.json"),
    JSON.stringify(data, null, 2),
    (err) => {
      if (err) {
        console.log("Error Occured while saving data to File");
        console.error(err);
      }
    }
  );

  res
    .status(200)
    .json({ success: true, response: "Message has been send to backend" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
