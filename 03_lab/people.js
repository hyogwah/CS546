const axios = require("axios");

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
  );
  return data; // this will be the array of people objects
}

async function getPersonById(id) {
  if (arguments.length != 1) throw `one argument only`;
  if (typeof id != "string") throw `enter string ID`;
  id = id.trim();
  if (id.length == 0) throw `enter proper ID`;
  let arr = await getPeople();
  let result = arr.find((x) => x.id === id);
  if (typeof result == "undefined") throw `person not found`;
  return result;
}

async function sameEmail(emailDomain) {
  if (arguments.length != 1) throw `one argument only`;
  if (typeof emailDomain != "string") throw `enter string email`;
  emailDomain = emailDomain.trim();
  if (emailDomain.length == 0) throw `enter proper email`;
  if (!emailDomain.includes(".")) throw `domain must include a period`;
  let dotTest = emailDomain.slice(emailDomain.indexOf(".") + 1);
  if (dotTest.includes(".")) {
    let dotTtest = dotTest.slice(dotTest.indexOf(".") + 1);
    if (dotTtest.length < 2) throw `must have at least 2 letters after period`;
  }
  if (dotTest.length < 2) throw `must have at least 2 letters after period`;

  let arr = await getPeople();
  let result = [];

  for (const x of arr) {
    if (x.email.slice(x.email.indexOf("@") + 1) === emailDomain) {
      result.push(x);
    }
  }
  if (result.length < 2) throw `err: total emails less than 2`;
  return result;
}

async function manipulateIp() {
  if (arguments.length != 0) throw `no arguments`;
  let arr = await getPeople();
  let res = [];

  for (const x of arr) {
    let obj = {
      firstname: x.first_name,
      lastname: x.last_name,
      ip: x.ip_address,
    };
    res.push(obj);
  }

  for (const x of res) {
    x.ip = x.ip.replace(/\./g, "");
    x.ip = x.ip.split("");
    x.ip = x.ip.sort();
    x.ip = x.ip.join();
    x.ip = x.ip.replace(/,/g, "");
    x.ip = parseInt(x.ip);
  }

  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;

  let maxObj = {};
  let minObj = {};
  let avg = 0;
  for (const x of res) {
    if (x.ip > max) {
      max = x.ip;
      maxObj = x;
    }
    if (x.ip < min) {
      min = x.ip;
      minObj = x;
    }
    avg += x.ip;
  }
  avg = avg / res.length;
  let result = {
    highest: { firstName: maxObj.firstname, lastName: maxObj.lastname },
    lowest: { firstName: minObj.firstname, lastName: minObj.lastname },
    average: Math.floor(avg),
  };
  return result;
}

async function sameBirthday(month, day) {
  if (arguments.length != 2) throw `must have 2 arguments (month, day)`;
  let m = parseInt(month);
  let d = parseInt(day);
  let monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  let arr30 = [4, 6, 9, 11];
  let arr31 = [1, 3, 5, 7, 8, 10, 12];
  let arr10s = [10, 11, 12];
  if (!(m in monthArr)) throw "month must be 1-12";
  if (m == 2) {
    if (d < 1 || d > 28) throw `number 1-28 for februrary`;
  } else if (d in arr30) {
    if (d < 1 || d > 30) throw `number 1-30 for day`;
  } else if (d in arr31) {
    if (d < 1 || d > 31) throw "number 1-31 for day";
  }
  let arr = await getPeople();
  let res = [];

  for (const x of arr) {
    let obj = {
      name: x.first_name + " " + x.last_name,
      birthday: x.date_of_birth.slice(0, 5).replace("/", ""),
    };
    res.push(obj);
  }
  let date = "";
  m = m.toString();
  d = d.toString();
  if (m.length == 1) {
    m = "0" + m;
  }
  if (d.length == 1) {
    d = "0" + d;
  }
  date = m + d;
  let result = [];

  for (const x of res) {
    if (date == x.birthday) {
      result.push(x);
    }
  }
  if (result.length == 0) throw `nobody has this birthday`;
  let answer = [];
  result.forEach((x) => answer.push(x.name));
  return answer;
}

module.exports = {
  description: "people.js modules",
  getPeople,
  getPersonById,
  sameEmail,
  manipulateIp,
  sameBirthday,
};
