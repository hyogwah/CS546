// stringUtils.js
// ran prettier

function camelCase(str1) {
  if (arguments.length != 1) throw `one string only`;
  if (typeof str1 != "string") throw `input string only`;
  str = str1.trim();

  if (str.length < 1)
    throw `string must be at least 1 character long (excludes spaces)`;

  str = str.toLowerCase();
  if (str.length == 1) return str;
  let arrSplit = str.split(" ");

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  for (let i = 1; i < arrSplit.length; i++) {
    arrSplit[i] = capitalize(arrSplit[i]);
  }

  let result = arrSplit.join("");
  return result;
}

function replaceChar(str1) {
  if (arguments.length != 1) throw `one string only`;
  if (typeof str1 != "string") throw `input string only`;
  str = str1.trim();
  if (str.length < 1)
    throw `string must be at least 1 character long (excludes spaces)`;
  let count = 1;
  let arrSplit = str.split("");
  let lower = arrSplit[0].toLowerCase();
  let upper = arrSplit[0].toUpperCase();

  for (let i = 1; i < arrSplit.length; i++) {
    if (arrSplit[i] == lower || arrSplit[i] == upper) {
      if (count % 2 == 1) {
        arrSplit[i] = "*";
        count++;
      } else {
        arrSplit[i] = "$";
        count++;
      }
    }
  }

  let result = arrSplit.join("");
  return result;
}

function mashUp(str1, str2) {
  if (arguments.length != 2) throw `two strings input`;
  if (typeof str1 != "string" && typeof str2 != "string")
    throw `input string only`;
  str1 = str1.trim();
  str2 = str2.trim();
  if (str1.length < 3 || str2.length < 3)
    throw `string must be at least 2 character long (excludes spaces)`;

  let arr1 = str1.split("");
  let arr2 = str2.split("");

  let temp = arr1[0];
  arr1[0] = arr2[0];
  arr2[0] = temp;

  temp = arr1[1];
  arr1[1] = arr2[1];
  arr2[1] = temp;

  let res1 = arr1.join("");
  let res2 = arr2.join("");
  return res1 + " " + res2;
}

module.exports = {
  description: "stringUtils.js modules",
  camelCase,
  replaceChar,
  mashUp,
};
