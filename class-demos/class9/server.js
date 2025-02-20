let express = require("express");

let app = express();

app.use(express.static("public"));

app.listen(5555, function () {
  console.log("http://127.0.0.1:5555");
});

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/image", function (req, res) {
    res.sendFile("img1.jpg", { root: "public" });
  });