
const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.render("index", { title: "my title", message: "test mesage" });
  });
  module.exports = router;