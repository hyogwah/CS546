const express = require("express");
const router = express.Router();
const data = require("../data");
const userApi = data.users;

router.route("/people").get(async (req, res) => {
  try {
    const user = await userApi.getPeople();
    res.json(user);
  } catch (e) {
    res.status(500).json(e);
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
