const axios = require("axios");
const people = require("./people");

async function getStocks() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json"
  );
  return data; // this will be the array of people objects
}

async function listShareholders(stockName) {
  if (arguments.length != 1) throw `one argument`;
  if (typeof stockName != "string") throw `stockName must be string`;
  stockName = stockName.trim();
  if (stockName.length == 0) throw "empty spaces bad";
  let arr = await getStocks();
  let stock = {};
  for (const x of arr) {
    if (x.stock_name == stockName) {
      stock = x;
    }
  }
  if (Object.keys(stock).length === 0) throw "no match";
  let shareArr = [];
  for (const x of stock.shareholders) {
    let person = await people.getPersonById(x.userId);
    shareArr.push({
      first_name: person.first_name,
      last_name: person.last_name,
      number_of_shares: x.number_of_shares,
    });
  }
  let answer = {
    id: stock.id,
    stock_name: stock.stock_name,
    shareholders: shareArr,
  };
  return answer;
}

async function totalShares(stockName) {
  if (arguments.length != 1) throw `one argument`;
  if (typeof stockName != "string") throw `stockName must be string`;
  stockName = stockName.trim();
  if (stockName.length == 0) throw "empty spaces bad";
  let arr = await getStocks();
  let stock = {};
  for (const x of arr) {
    if (x.stock_name == stockName) {
      stock = x;
    }
  }
  if (Object.keys(stock).length === 0) throw "no match";
  let numKeys = Object.keys(stock.shareholders).length;
  let totalStock = 0;
  for (const x of stock.shareholders) {
    totalStock += x.number_of_shares;
  }

  if (numKeys == 0) {
    return `${stockName} currently has no shareholders.`;
  } else if (numKeys == 1) {
    return `${stockName} has 1 shareholder that owns a total of ${totalStock} shares.`;
  } else {
    return `${stockName} has ${numKeys} shareholders that own a total of ${totalStock} shares`;
  }
}

async function listStocks(firstName, lastName) {
  if (arguments.length != 2) throw `two arguments needed`;
  if (typeof firstName != "string" || typeof lastName != "string")
    throw `arguments must be strings`;
  firstName.trim();
  lastName.trim();
  if (firstName.length == 0 || lastName.length == 0)
    throw `error length of string`;
  let ID = "";
  let arr = await people.getPeople();
  let arrStocks = await getStocks();
  for (const x of arr) {
    if (x.first_name == firstName && x.last_name == lastName) {
      ID = x.id;
    }
  }
  let answer = [];
  if (ID.length == 0) throw "person not found";

  for (const x of arrStocks) {
    for (const y of x.shareholders) {
      if (y.userId == ID) {
        answer.push({
          stock_name: x.stock_name,
          number_of_shares: y.number_of_shares,
        });
      }
    }
  }
  return answer;
}

async function getStockById(id) {
  if (arguments.length != 1) throw `one argument only`;
  if (typeof id != "string") throw `enter string ID`;
  id = id.trim();
  if (id.length == 0) throw `enter proper ID`;
  let arr = await getStocks();
  let result = arr.find((x) => x.id === id);
  if (typeof result == "undefined") throw `stock not found`;
  return result;
}

module.exports = {
  description: "stocks.js",
  listShareholders,
  totalShares,
  listStocks,
  getStockById,
};
