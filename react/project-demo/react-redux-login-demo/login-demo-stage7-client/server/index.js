const express = require("express");
const app = express();
const debug = require("debug")("my-application");

app.use(express.json());

const users = require("./routes/users");
app.use("/api/users", users);

app.listen(3033, (req, res) => {
  debug("服务器运行在3033端口~");
});
