// console.log("Plant Corn");
// setTimeout(() => {
//   console.log("Water Plant");
//   console.log("Add fertilizer");
// }, 3000);

/*
function greeting(name) {
  return `Hello, ${name}, welcome to CS-546!`;
}

function introduction(firstName, lastName, callback) {
  const fullName = `${firstName} ${lastName}`;
  console.log(callback(fullName));
}

introduction("Eric", "Song", greeting);
*/

function study(subject, callback) {
  console.log(`I am about to study ${subject}`);
  callback(subject);
}

function afterStudy(subject) {
  console.log(`I am done studying ${subject}, now it's time to party`);
}

study("MongoDb", (subject) => {
  console.log(`I am done studying ${subject} and I am tired`);
});