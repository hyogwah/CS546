const mongoCollections = require("../config/mongoCollections");
const bands = mongoCollections.bands;
const { ObjectId } = require("mongodb");

module.exports = {
  async get(id) {
    if (arguments.length !== 1) throw `1 argument only`;
    if (typeof id !== "string") throw `id must be a string`;
    id = id.trim();
    if (id.length === 0) throw `id cannot be empty`;

    if (!ObjectId.isValid(id)) throw `invalid object ID`;

    const bandCollection = await bands();
    const band = await bandCollection.findOne({ _id: ObjectId(id) });
    if (band === null) throw `No band with that id`;
    band._id = band._id.toString();
    return band;
  },

  async create(name, genre, website, recordLabel, bandMembers, yearFormed) {
    if (arguments.length != 6) throw `Missing arguments`;
    if (typeof name !== "string")
      throw `name, website, recordLabel must be strings`;
    if (typeof website !== "string")
      throw `name, website, recordLabel must be strings`;
    if (typeof recordLabel !== "string")
      throw `name, website, recordLabel must be strings`;
    name = name.trim();
    website = website.trim();
    recordLabel = recordLabel.trim();
    if (name.length == 0 || website.length == 0 || recordLabel.length == 0)
      throw `input cannot be empty spaces`;

    let httpTest = website.slice(0, 11);
    if (httpTest !== "http://www.") throw `website must include http://`;

    let comTest = website.slice(-4);
    if (comTest !== ".com") throw `website must end in .com`;

    if (website.length < 20)
      throw `website must have at least 5 characters in between`;

    if (Array.isArray(genre) != true || Array.isArray(bandMembers) != true)
      throw `genre and bandMembers must be arrays`;

    if (genre.length == 0) throw `genre array must have at least 1 element`;
    if (bandMembers == 0)
      throw `band members array must have at least 1 element`;

    for (x in genre) {
      if (typeof x != "string")
        throw `all elements in genre array must be strings`;
      x = x.trim();
      if (x.length == 0)
        throw `elements in genre array must not be empty strings`;
    }
    for (x in bandMembers) {
      if (typeof x != "string")
        throw `all elements in bandMembers array must be strings`;
      x = x.trim();
      if (x.length == 0)
        throw `elements in bandMembers array must not be empty strings`;
    }

    if (typeof yearFormed != "number") throw `year formed must be a number`;
    if (Number.isInteger(yearFormed) != true)
      throw `year formed must be an integer`;
    if (yearFormed > 2022 || yearFormed < 1900)
      throw `year formed must be between 1900-2022`;

    const bandCollection = await bands();

    let newBand = {
      name: name,
      genre: genre,
      website: website,
      recordLabel: recordLabel,
      bandMembers: bandMembers,
      yearFormed: yearFormed,
      albums: [],
      overallRating: 0,
    };

    const insertInfo = await bandCollection.insertOne(newBand);

    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw `Could not add band`;

    const newId = insertInfo.insertedId.toString();

    const bandReturn = await this.get(newId);
    return bandReturn;
  },
  async getAll() {
    if (arguments.length != 0) throw `houston we have a problem`;
    const bandCollection = await bands();
    const bandList = await bandCollection.find({}).toArray();
    if (bandList.length == 0) return [];
    for (x of bandList) {
      x._id = x._id.toString();
    }
    return bandList;
  },
  async remove(id) {
    if (arguments.length != 1) throw `1 argument`;
    if (typeof id != "string") throw `id must be a string`;
    id = id.trim();
    if (id.length == 0) throw `id must not be nothing`;
    if (!ObjectId.isValid(id)) throw `invalid object ID`;

    const bandCollection = await bands();
    const deletionInfo = await bandCollection.deleteOne({ _id: ObjectId(id) });

    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete band with id of ${id}`;
    }
    return `${id} has been successfully deleted!`;
  },

  async update(id, name, genre, website, recordLabel, bandMembers, yearFormed) {
    if (arguments.length != 7) throw `Missing arguments`;
    if (typeof id !== "string") throw `id must be a string`;
    if (typeof name !== "string")
      throw `name, website, recordLabel must be strings`;
    if (typeof website !== "string")
      throw `name, website, recordLabel must be strings`;
    if (typeof recordLabel !== "string")
      throw `name, website, recordLabel must be strings`;

    id = id.trim();
    name = name.trim();
    website = website.trim();
    recordLabel = recordLabel.trim();
    if (
      id.length ||
      name.length == 0 ||
      website.length == 0 ||
      recordLabel.length == 0
    )
      throw `input cannot be empty spaces`;

    if (!ObjectId.isValid(id)) throw `invalid object ID`;

    let httpTest = website.slice(0, 11);
    if (httpTest !== "http://www.") throw `website must include http://`;

    let comTest = website.slice(-4);
    if (comTest !== ".com") throw `website must end in .com`;

    if (website.length < 20)
      throw `website must have at least 5 characters in between`;

    if (Array.isArray(genre) != true || Array.isArray(bandMembers) != true)
      throw `genre and bandMembers must be arrays`;

    if (genre.length == 0) throw `genre array must have at least 1 element`;
    if (bandMembers == 0)
      throw `band members array must have at least 1 element`;

    for (x in genre) {
      if (typeof x != "string")
        throw `all elements in genre array must be strings`;
      x = x.trim();
      if (x.length == 0)
        throw `elements in genre array must not be empty strings`;
    }
    for (x in bandMembers) {
      if (typeof x != "string")
        throw `all elements in bandMembers array must be strings`;
      x = x.trim();
      if (x.length == 0)
        throw `elements in bandMembers array must not be empty strings`;
    }

    if (typeof yearFormed != "number") throw `year formed must be a number`;
    if (Number.isInteger(yearFormed) != true)
      throw `year formed must be an integer`;
    if (yearFormed > 2023 || yearFormed < 1900)
      throw `year formed must be between 1900-2022`;

    const bandCollection = await bands();

    let updatedBand = {
      name: name,
      genre: genre,
      website: website,
      recordLabel: recordLabel,
      bandMembers: bandMembers,
      yearFormed: yearFormed,
    };

    const updatedInfo = await bandCollection.replaceOne(
      { _id: ObjectId(id) },
      { $set: updatedBand }
    );

    if (updatedInfo.modifiedCount === 0) {
      throw `could not update band successfully`;
    }
    return await this.get(id);
  },
};
