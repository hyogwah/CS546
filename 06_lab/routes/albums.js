const express = require("express");
const router = express.Router();
const data = require("../data");
const albumsData = data.albums;

router.get("/", async (req, res) => {
  try {
    req.params.id = validation.checkId(req.params.id, "Id URL Param");
  } catch (e) {
    return res.status(400).json({ error: e });
  }
  try {
    const post = await postData.getPostById(req.params.id);
    res.json(post);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.route("/work").get(async (req, res) => {
  try {
    const user = await userApi.getWork();
    res.json(user);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.route("/people/:id").get(async (req, res) => {
  try {
    const user = await userApi.getPersonById(req.params.id);
    res.json(user);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.route("/work/:id").get(async (req, res) => {
  try {
    const user = await userApi.getWorkById(req.params.id);
    res.json(user);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
