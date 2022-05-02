const x = 12;
const y = 25;

let multiplied = x * y;
let divided = y / x;
let subtracted = x - y;
let added = x + y;

console.log(multiplied, divided, subtracted, added);

let toThePowerOf = Math.pow(x, y);
console.log(toThePowerOf);

let multipliedString = multiplied.toString();
console.log(multipliedString);

// this will concatenate
console.log(multipliedString + 5);

//console.log(multipliedString);
multipliedString = '300';
console.log(parseInt(multipliedString) + 5);