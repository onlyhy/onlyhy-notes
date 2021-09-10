const express = require("express");
const app = express();
const debug = require("debug")("my-application");

const users = require("./routes/users");
app.use("/api/users", users);

app.listen(3030, (req, res) => {
  debug("服务器运行在3030端口~");
});
