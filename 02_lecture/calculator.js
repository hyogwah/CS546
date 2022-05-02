function checkIsProperNumber(val, varibleName) {
  if (typeof val != 'number')
    throw `${varibleName || 'provided variable'} is not a number`;

  if (isNaN(val)) throw `${varibleName || 'provided variable'} is NaN`;
}

let x = 25;
module.exports = {
  description: 'This is our first module',
  addTwoNumbers: (num1, num2) => {
    checkIsProperNumber(num1, 'the first number');
    checkIsProperNumber(num2, 'the second number');
    return num1 + num2;
  },
  subtractTwoNumbers: (num1, num2) => {
    checkIsProperNumber(num1);
    checkIsProperNumber(num2);
    return num1 - num2;
  },
  multiplyTwoNumbers: (num1, num2) => {
    checkIsProperNumber(num1);
    checkIsProperNumber(num2);
    return num1 * num2;
  },
  divideTwoNumbers: (num1, num2) => {
    checkIsProperNumber(num1);
    checkIsProperNumber(num2);
    if (num2 === 0) throw 'Error division by zero!';
    return num1 / num2;
  },
  squareRoot: (num1) => {
    checkIsProperNumber(num1);
    return Math.sqrt(num1);
  },
  x,
};
