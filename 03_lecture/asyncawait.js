// async is like promise fufilling
async function myRide() {
  return "Tesla Model X";
}
// same thing as
function myRide2() {
  return Promise.resolve("Tesla Model X");
}

//rejection function
function foo() {
  return Promise.reject("rejected");
}
//same thing as
async function bar() {
  throw "rejected";
}

const myDate = async () => {
  try {
    let dDetails = await date();
    let message = await orderUber(dDetails);
    console.log(message);
  } catch (e) {
    console.log(e);
  }
};

myDate();
console.log("After my date has been called");
