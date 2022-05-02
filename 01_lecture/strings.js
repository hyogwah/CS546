//This is a comment

/* this is multi-line
this will keep going */

const constString = "I am a constant, I cannot be changed, I'm free as a bird";

console.log(constString);

//constString = "I'm not allowed";

let letString = "I'm a let string, I can be changed";

console.log(letString);

letString = "I'm the new value";

console.log(letString);

var varString = "I'm a var string";

console.log(varString);

let blankString = "   Eric Song    ";
console.log(blankString.length);

console.log(blankString.trim().length);

let anotherString = 'hello';
console.log(anotherString.toLowerCase());

console.log(anotherString.indexOf('e'));

console.log(anotherString.charAt(2));

let myConcatString = letString + ' ' + varString;

myConcatString = `Let string is: ${letString}, Var string is:

${varString}`;
console.log(myConcatString);

console.log(letString.concat('  ' + varString));

console.log(letString);

let myString1 = "Hello there, How are you? My name is Eric Song";

console.log(myString1.split(' '));