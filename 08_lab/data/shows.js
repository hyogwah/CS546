const axios = require("axios");

async function getSearchedShows(showSearchTerm) {
  let original = showSearchTerm;
  showSearchTerm = showSearchTerm.trim();
  if (showSearchTerm.length == 0) throw `INVALID INPUT`;

  showSearchTerm = showSearchTerm.split(" ").join("+");
  let websiteURL = "http://api.tvmaze.com/search/shows?q=";
  websiteURL = websiteURL.concat(showSearchTerm);

  const { data } = await axios.get(websiteURL);
  console.log(data);
  let num = Object.keys(data).length;
  if (num == 0) {
    data.searchterm = original;
    return data;
  }
  data.searchterm = original;

  return data;
}

async function getOneShow(id) {
  let websiteURL = "http://api.tvmaze.com/shows/";
  id = id.trim();
  websiteURL = websiteURL.concat(id);

  const { data } = await axios.get(websiteURL);
  return data;
}
module.exports = {
  getSearchedShows,
  getOneShow,
};
