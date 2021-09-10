const express = require("express");
const router = express.Router();

router.get("/api/list", (req, res) => {
  res.send([
    {
      name: "hy",
      age: 26,
    },
    {
      name: "hhy",
      age: 17,
    },
  ]);
});

module.exports = router;
