const express = require("express");
const router = express.Router();
const data = require("../data");
const showData = data.shows;

router.get("/:id", async (req, res) => {
  let show = await showData.getOneShow(req.params.id);
  res.render("posts/show", { show, title: show.name });
});

module.exports = router;
