// objUtils.js page
// used prettier for formatting

function makeArrays(arr) {
  if (arguments.length != 1) throw `usage: makeArray([obj])`;
  if (Array.isArray(arr) == false) throw `not an array`;
  if (arr.length < 2) throw `array must include at least two objects`;
  let arrayOfObj = [];
  let temp = [];

  arr.forEach((x) => {
    if (typeof x != "object") throw `array elements must be objects`;
    if (Object.keys(x).length < 1)
      throw `object must include one key/value pair`;
    temp = Object.keys(x);
    for (let i = 0; i < temp.length; i++) {
      let arr1 = [temp[i], x[temp[i]]];
      arrayOfObj.push(arr1);
    }
  });
  return arrayOfObj;
}
function isDeepEqualHelper(obj1, obj2) {
  let arr1 = Object.keys(obj1);
  let arr2 = Object.keys(obj2);

  if (arr1.length != arr2.length) return false;
  if (arr1 == {} || arr2 == {}) return true;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] in obj2) {
      if (typeof obj1[arr1[i]] == "object") {
        if (isDeepEqualHelper(obj1[arr1[i]], obj2[arr1[i]]) == false) {
          return false;
        }
      }
    }
    if (obj1[arr1[i + 1]] != obj2[arr1[i + 1]]) return false;
  }
  return true;
}
function isDeepEqual(obj1, obj2) {
  if (arguments.length != 2) throw `usage: (obj,obj)`;
  if (typeof obj1 != "object" || typeof obj2 != "object")
    throw `input must be objects`;

  return isDeepEqualHelper(obj1, obj2);
}

function computeObject(object, func) {
  if (arguments.length != 2) throw `must have two arguments`;
  if (typeof object != "object" || typeof func != "function")
    throw `usage: computeObject(object,function)`;

  keyArr = Object.keys(object);
  valArr = Object.values(object);

  if (keyArr.length < 1 || valArr.length < 1) throw `at least one key/value`;
  for (let i = 0; i < valArr.length; i++) {
    if (typeof valArr[i] != "number") throw `object values must be a number`;
    object[keyArr[i]] = func(object[keyArr[i]]);
  }
  return object;
}

module.exports = {
  description: "objUtils.js module",
  makeArrays,
  isDeepEqual,
  computeObject,
};
