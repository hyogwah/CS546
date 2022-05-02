const mongoCollections = require("../config/mongoCollections");
const bands = mongoCollections.bands;
const { ObjectId } = require("mongodb");

module.exports = {
  async get(id) {
    if (arguments.length !== 1) throw new Error("1 argument only");
    if (typeof id !== "string") throw new Error("id must be a string");
    id = id.trim();
    if (id.length === 0) throw new Error("id cannot be empty");

    if (!ObjectId.isValid(id)) throw new Error("invalid object ID");

    const bandCollection = await bands();
    const band = await bandCollection.findOne({ _id: ObjectId(id) });
    if (band === null) throw new Error("No band with that id");
    band._id = band._id.toString();
    return band;
  },
  async create(name, genre, website, recordLabel, bandMembers, yearFormed) {
    if (arguments.length != 6) throw new Error("Missing arguments");
    if (typeof name !== "string")
      throw new Error("name, website, recordLabel must be strings");
    if (typeof website !== "string")
      throw new Error("name, website, recordLabel must be strings");
    if (typeof recordLabel !== "string")
      throw new Error("name, website, recordLabel must be strings");
    name = name.trim();
    website = website.trim();
    recordLabel = recordLabel.trim();
    if (name.length == 0 || website.length == 0 || recordLabel.length == 0)
      throw new Error("input cannot be empty spaces");

    let httpTest = website.slice(0, 11);
    if (httpTest !== "http://www.")
      throw new Error("website must include http://");

    let comTest = website.slice(-4);
    if (comTest !== ".com") throw new Error("website must end in .com");

    if (website.length < 20)
      throw new Error("website must have at least 5 characters in between");

    if (Array.isArray(genre) != true || Array.isArray(bandMembers) != true)
      throw new Error("genre and bandMembers must be arrays");

    for (x in genre) {
      if (typeof x != "string")
        throw new Error("all elements in genre array must be strings");
      x = x.trim();
      if (x.length == 0)
        throw new Error("elements in genre array must not be empty strings");
    }
    for (x in bandMembers) {
      if (typeof x != "string")
        throw new Error("all elements in bandMembers array must be strings");
      x = x.trim();
      if (x.length == 0)
        throw new Error(
          "elements in bandMembers array must not be empty strings"
        );
    }

    if (typeof yearFormed != "number")
      throw new Error("year formed must be a number");
    if (Number.isInteger(yearFormed) != true)
      throw new Error("year formed must be an integer");
    if (yearFormed > 2022 || yearFormed < 1900)
      throw new Error("year formed must be between 1900-2022");

    const bandCollection = await bands();

    let newBand = {
      name: name,
      genre: genre,
      website: website,
      recordLabel: recordLabel,
      bandMembers: bandMembers,
      yearFormed: yearFormed,
    };

    const insertInfo = await bandCollection.insertOne(newBand);

    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw new Error("Could not add band");

    const newId = insertInfo.insertedId.toString();

    const bandReturn = await this.get(newId);
    return bandReturn;
  },
  async getAll() {
    if (arguments.length != 0) throw new Error("houston we have a problem");
    const bandCollection = await bands();
    const bandList = await bandCollection.find({}).toArray();
    if (bandList.length == 0) return [];
    for (x of bandList) {
      x._id = x._id.toString();
    }
    return bandList;
  },
  async remove(id) {
    if (arguments.length != 1) throw new Error("1 argument");
    if (typeof id != "string") throw new Error("id must be a string");
    id = id.trim();
    if (id.length == 0) throw new Error("id must not be nothing");
    if (!ObjectId.isValid(id)) throw new Error("invalid object ID");

    const bandCollection = await bands();
    const deletionInfo = await bandCollection.deleteOne({ _id: ObjectId(id) });

    if (deletionInfo.deletedCount === 0) {
      throw new Error(`Could not delete band with id of ${id}`);
    }
    return `${id} has been successfully deleted!`;
  },

  async rename(id, newName) {
    if (arguments.length != 2) throw new Error("2 argument");
    if (typeof id !== "string") throw new Error("id must be a string");
    id = id.trim();
    if (id.length == 0) throw new Error("id must not be nothing");
    if (!ObjectId.isValid(id)) throw new Error("invalid object ID");

    if (typeof newName != "string")
      throw new Error("new name must be a string");

    const bandCollection = await bands();

    const updatedBand = {
      name: newName,
    };

    const bandband = await this.get(id);
    if (bandband.name == newName)
      throw new Error("newname is the same as old name");
    const updatedInfo = await bandCollection.updateOne(
      { _id: ObjectId(id) },
      { $set: updatedBand }
    );

    if (updatedInfo.modifiedCount === 0) {
      throw new Error("could not update band successfully");
    }
    return await this.get(id);
  },
};
