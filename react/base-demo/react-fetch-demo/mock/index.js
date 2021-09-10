const express = require("express");
const app = express();

const router = require("./router");
// app.use("/", router);
app.get("/", (req, res) => {
  res.send({ msg: "1111111" });
});
app.listen(3100, function () {
  console.log("server running at port 3100");
});
