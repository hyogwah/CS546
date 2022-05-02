// I pledge my honor that I have abided by the Stevens Honor System.
// Using Prettier extension on VSCode for formatting.

// arrayUtils.js will export 6 functions, each of which will pertain to arrays.

function checkIsProperNumber(val, varibleName) {
  if (typeof val != "number")
    throw `${varibleName || "provided variable"} is not a number`;

  if (isNaN(val)) throw `${varibleName || "provided variable"} is NaN`;
}

function arrTesting(arr) {
  // checking: array exists, array is of proper type, array is not empty, each array element is a number

  //condition 1
  if (typeof arr == "undefined") throw `no input`;
  //condition 2
  if (Array.isArray(arr) == false) throw `not an array`;
  // condition 3
  if (arr.length == 0) throw `array is empty`;
  // condition 4
  arr.forEach((x) => {
    checkIsProperNumber(x);
  });
}

function mean(arr) {
  if (arguments.length != 1) throw `input one array`;
  arrTesting(arr);
  let result = 0;
  arr.forEach((x) => {
    result += x;
  });
  return result / arr.length;
}

function medianSquared(arr) {
  if (arguments.length != 1) throw `input one array`;
  arrTesting(arr);

  // sorting by adding a new method which handles numeric sorts
  // code taken from snippet found in
  // https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly

  arr.sort(function (a, b) {
    return a - b;
  });
  let x = arr.length;
  if (x % 2 == 0) {
    // [1,2,3,4] length = 4
    let avgOfEven = (arr[x / 2] + arr[x / 2 - 1]) / 2;
    return avgOfEven ** 2;
  }
  return arr[Math.ceil(x / 2)] ** 2;
}

function maxElement(arr) {
  if (arguments.length != 1) throw `input one array`;
  arrTesting(arr);
  let max = Number.NEGATIVE_INFINITY;
  let index = 0;
  let count = 0;
  arr.forEach((x) => {
    if (x > max) {
      max = x;
      index = count;
    }
    count++;
  });
  let obj = {};
  obj[max] = index;
  return obj;
}

function fill(end, value) {
  if (arguments.length == 0 || arguments.length > 2)
    throw `wrong input, fill(end,[value])`;
  if (typeof end != "number") throw "end should be a number";
  if (end < 1) throw "end should be a number greater than 0";

  let arr = [];
  if (arguments.length == 1) {
    for (let i = 0; i < end; i++) arr.push(i);
    return arr;
  }
  if (arguments.length == 2) {
    for (let i = 0; i < end; i++) arr.push(value);
    return arr;
  }
}

function countRepeating(arr) {
  if (arguments.length != 1) throw `input one array`;
  if (Array.isArray(arr) == false) throw `not an array`;
  if (arr.length == 0) return {};

  let newObj = {};
  arr.forEach((x) => {
    if (!(x in newObj)) {
      newObj[x] = 1;
    } else {
      newObj[x]++;
    }
  });

  for (x in newObj) {
    if (newObj[x] < 2) {
      delete newObj[x];
    }
  }

  return newObj;
}

function isEqualHelper(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    if (Array.isArray(arr1[i]) == true) {
      for (let j = 0; j < arr1[i].length; j++) {
        if (arr1[i][j] != arr2[i][j]) {
          return false;
        }
      }
      continue;
    }
    if (arr1[i] != arr2[i]) {
      return false;
    }
  }
  return true;
}
function isEqual(arr1, arr2) {
  if (arguments.length != 2) throw `enter two arrays`;
  if (Array.isArray(arr1) == false || Array.isArray(arr2) == false)
    throw `input must be arrays`;
  if (arr1.length != arr2.length) return false;

  arr1.forEach((x) => {
    if (Array.isArray(x) == true) {
      x.sort(function (a, b) {
        return a - b;
      });
    }
  });
  arr2.forEach((x) => {
    if (Array.isArray(x) == true) {
      x.sort(function (a, b) {
        return a - b;
      });
    }
  });
  arr1.sort();
  arr2.sort();
  arr1.sort(function (a, b) {
    return a - b;
  });
  arr2.sort(function (a, b) {
    return a - b;
  });
  return isEqualHelper(arr1, arr2);
}

module.exports = {
  description: "arrayUtils.js modules",
  mean,
  medianSquared,
  maxElement,
  fill,
  countRepeating,
  isEqual,
};
