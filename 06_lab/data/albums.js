const mongoCollections = require("../config/mongoCollections");
const bandsS = require("./bands");
const bands = mongoCollections.bands;
const { ObjectId } = require("mongodb");

module.exports = {
  async get(albumId) {
    if (arguments.length !== 1) throw `1 argument only`;
    if (typeof albumId !== "string") throw `id must be a string`;
    albumId = albumId.trim();
    if (albumId.length === 0) throw `id cannot be empty`;

    if (!ObjectId.isValid(albumId)) throw `invalid object ID`;

    const bandCollection = await bands();
    const band = await bandCollection.findOne({ _id: ObjectId(id) });
    if (band === null) throw `No band with that id`;
    band._id = band._id.toString();
    return band;
  },

  async create(bandId, title, releaseDate, tracks, rating) {
    if (arguments.length != 5) throw `Missing arguments`;
    if (typeof bandId !== "string")
      throw `name, website, recordLabel must be strings`;
    if (typeof title !== "string")
      throw `name, website, recordLabel must be strings`;
    if (typeof releaseDate !== "string")
      throw `name, website, recordLabel must be strings`;
    bandId = bandId.trim();
    website = website.trim();
    recordLabel = recordLabel.trim();

    if (bandId.length == 0 || website.length == 0 || recordLabel.length == 0)
      throw `input cannot be empty spaces`;

    if (!ObjectId.isValid(bandId)) throw `invalid object ID`;
    const band = await bandCollection.findOne({ _id: ObjectId(bandId) });
    if (band == null) throw `band does not exist`;

    if (Array.isArray(tracks) != true) throw `tracks must be arrays`;

    if (tracks.length < 3) throw `tracks array must have at least 3 element`;

    for (x in tracks) {
      if (typeof x != "string")
        throw `all elements in genre array must be strings`;
      x = x.trim();
      if (x.length == 0)
        throw `elements in genre array must not be empty strings`;
    }

    // dates :: releaseDate is a string MM/DD/YYYY

    if (releaseDate.length != 10)
      throw `release date must be in form MM/DD/YYYY`;
    releaseDate.replace(/\//g, "ForwardSlash");
    let month = str.slice(0, 2);
    let day = str.slice(2, 4);
    let year = str.slice(4, 9);

    let m = parseInt(month);
    let d = parseInt(day);
    let y = parseInt(year);
    if (isNaN(m)) throw `release date must be in form MM/DD/YYYY`;
    if (isNaN(d)) throw `release date must be in form MM/DD/YYYY`;
    if (isNaN(y)) throw `release date must be in form MM/DD/YYYY`;

    let monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let arr30 = [4, 6, 9, 11];
    let arr31 = [1, 3, 5, 7, 8, 10, 12];
    if (!(m in monthArr)) throw "month must be 1-12";
    if (m == 2) {
      if (d < 1 || d > 28) throw `number 1-28 for februrary`;
    } else if (d in arr30) {
      if (d < 1 || d > 30) throw `number 1-30 for day`;
    } else if (d in arr31) {
      if (d < 1 || d > 31) throw "number 1-31 for day";
    }
    if (y < 1900 || y > 2023)
      throw `year should be 1900 < year < current year + one year`;

    if (typeof rating !== "number") throw `rating must be a number`;

    if (rating > 5 || rating < 1) throw `rating must be between 1 and 5`;

    const bandCollection = await bands();

    let newAlbum = {
      bandId: bandId,
      title: title,
      releaseDate: releaseDate,
      tracks: tracks,
      rating: rating,
    };

    return bandCollection
      .updateOne({ _id: bandId }, { $addToSet: { albums: newAlbum } })
      .then(function () {
        return newAlbum;
      });
  },

  async getAll(bandId) {
    if (arguments.length !== 1) throw `1 argument only`;
    if (typeof bandId !== "string") throw `id must be a string`;
    bandId = bandId.trim();
    if (bandId.length === 0) throw `id cannot be empty`;
    const band = await bandsS.get(bandId);
    return band.albums;
  },

  async remove(albumId) {
    if (arguments.length != 1) throw `1 argument`;
    if (typeof albumId != "string") throw `id must be a string`;
    albumId = albumId.trim();
    if (albumId.length == 0) throw `id must not be nothing`;
    if (!ObjectId.isValid(albumId)) throw `invalid object ID`;

    const bandCollection = await bands();
    let band = bandCollection
      .find({ "albums._id": albumId })
      .updateOne({ _id: band._id }, { $pull: { albums: { _id: albumId } } })
      .then(function () {
        return bands.get(band._id);
      });
  },
};
