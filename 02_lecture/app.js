const calculator = require('./calculator');

try {
  console.log(calculator.divideTwoNumbers(10, 0));
} catch (e) {
  console.log(e);
}

try {
  console.log(calculator.addTwoNumbers(5, 5));
} catch (e) {
  console.log(e);
}

try {
  console.log(calculator.multiplyTwoNumbers(5, 5));
} catch (e) {
  console.log(e);
}

try {
  console.log(calculator.subtractTwoNumbers(10, 5));
} catch (e) {
  console.log(e);
}

try {
  console.log(calculator.square(10));
} catch (e) {
  console.log(e);
}
