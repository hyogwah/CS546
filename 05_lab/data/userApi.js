const axios = require("axios");

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json"
  );
  return data;
}

async function getWork() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json"
  );
  return data;
}

async function getPersonById(id) {
  if (arguments.length != 1) throw `one argument only`;
  if (typeof id != "string") throw `enter string ID`;
  id = id.trim();
  if (id.length == 0) throw `enter proper ID`;
  id = parseInt(id);
  let arr = await getPeople();
  let result = arr.find((x) => x.id == id);
  if (typeof result == "undefined") throw `person not found`;
  return result;
}

async function getWorkById(id) {
  if (arguments.length != 1) throw `one argument only`;
  if (typeof id != "string") throw `enter string ID`;
  id = id.trim();
  if (id.length == 0) throw `enter proper ID`;
  id = parseInt(id);
  let arr = await getWork();
  let result = arr.find((x) => x.id == id);
  if (typeof result == "undefined") throw `work not found`;
  return result;
}

module.exports = {
  description: "userApi function",
  getPeople,
  getWork,
  getPersonById,
  getWorkById,
};
