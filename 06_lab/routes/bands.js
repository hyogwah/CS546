const express = require("express");
const router = express.Router();
const data = require("../data");
const bandsDataFun = data.bands;

router.get("/", async (req, res) => {
  try {
    const band = await bandsData
      .find({}, { projection: { _id: 0, name: 1 } })
      .toArray();
    res.json(band);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.post("/", async (req, res) => {
  const bandsData = req.body;
  try {
    if (typeof bandsData.name !== "string")
      throw `name, website, recordLabel must be strings`;
    if (typeof bandsData.website !== "string")
      throw `name, website, recordLabel must be strings`;
    if (typeof bandsData.recordLabel !== "string")
      throw `name, website, recordLabel must be strings`;
    website = bandsData.website.trim();
    recordLabel = bandsData.recordLabel.trim();
    if (
      bandsData.name.length == 0 ||
      website.length == 0 ||
      recordLabel.length == 0
    )
      throw `input cannot be empty spaces`;

    let httpTest = website.slice(0, 11);
    if (httpTest !== "http://www.") throw `website must include http://`;

    let comTest = website.slice(-4);
    if (comTest !== ".com") throw `website must end in .com`;

    if (website.length < 20)
      throw `website must have at least 5 characters in between`;

    if (
      Array.isArray(bandsData.genre) != true ||
      Array.isArray(bandsData.bandMembers) != true
    )
      throw `genre and bandMembers must be arrays`;

    if (bandsData.genre.length == 0)
      throw `genre array must have at least 1 element`;
    if (bandsData.bandMembers == 0)
      throw `band members array must have at least 1 element`;

    for (x in bandsData.genre) {
      if (typeof x != "string")
        throw `all elements in genre array must be strings`;
      x = x.trim();
      if (x.length == 0)
        throw `elements in genre array must not be empty strings`;
    }
    for (x in bandsData.bandMembers) {
      if (typeof x != "string")
        throw `all elements in bandMembers array must be strings`;
      x = x.trim();
      if (x.length == 0)
        throw `elements in bandMembers array must not be empty strings`;
    }

    if (typeof bandsData.yearFormed != "number")
      throw `year formed must be a number`;
    if (Number.isInteger(bandsData.yearFormed) != true)
      throw `year formed must be an integer`;
    if (bandsData.yearFormed > 2022 || bandsData.yearFormed < 1900)
      throw `year formed must be between 1900-2022`;

    bandsDataFun.create();
  } catch (e) {
    res.status(400).json(e);
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
