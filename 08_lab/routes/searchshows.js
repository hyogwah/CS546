const express = require("express");
const router = express.Router();
const data = require("../data");
const showData = data.shows;

router.post("/", async (req, res) => {
  try {
    let shows = await showData.getSearchedShows(req.body.showSearchTerm);
    res.render("posts/search", { shows, title: "Shows Found" });
  } catch (e) {
    res.status(400).render("posts/error", { title: "400 ERROR" });
  }
});

module.exports = router;
