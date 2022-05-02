// I pledge my honor that I have abided by the Stevens Honor System.
// Using Prettier extension on VSCode for formatting.
const questionOne = function questionOne(arr) {
  // Implement question 1 here
  // Sum of the squares of each index in the array.
  let result = 0;

  arr.map((x) => {
    //using map here to take each value, and then an arrow function [basically lambda? equiv for python] to square it and add it to result
    result += x * x;
  });
  return result;
};

const questionTwo = function questionTwo(num) {
  // Implement question 2 here
  // Implementing fibonacci using recursion
  // Learned in CS115, took my work from Oct2020.

  if (num == 0 || num == 1) {
    return num;
  } else {
    return questionTwo(num - 1) + questionTwo(num - 2);
  }
};

const questionThree = function questionThree(text) {
  // Implement question 3 here
  // Vowel counter
  // I used regular expressions using the global modifier in order to have a global search when replacing the vowels
  let textLen = text.length;
  let newText = text.toLowerCase();
  newText = newText.replace(/a/g, '');
  newText = newText.replace(/e/g, '');
  newText = newText.replace(/i/g, '');
  newText = newText.replace(/o/g, '');
  newText = newText.replace(/u/g, '');
  let newLen = newText.length;
  // Took the length of the original string minus the length of the new string (vowels removed) to get total vowel count.
  return textLen - newLen;
};

const questionFour = function questionFour(num) {
  // Implement question 4 here
  // Implementing factorial function
  if (num < 0) {
    return NaN;
  } else if (num == 0) {
    return 1;
  } else if (num == 1) {
    return num;
  } else {
    return questionFour(num - 1) * num;
  }
};

module.exports = {
  firstName: 'Eric',
  lastName: 'Song',
  studentId: '10458313',
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};
