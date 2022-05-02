const weather = true;

/* version 1
const date = new Promise((resolve, reject) => {
  if (weather) {
    const dateDetails = {
      name: "BCD",
      location: "Fort Lee",
      table: 5,
    };
    resolve(dateDetails);
  } else {
    reject("Bad weather so no date");
  }
});

date
  .then((dDetails) => {
    console.log(dDetails);
  })
  .catch((error) => {
    console.log(error);
  });
*/

// version 2
function date() {
  if (weather) {
    const dateDetails = {
      name: "BCD",
      location: "Fort Lee",
      table: 5,
    };

    return Promise.resolve(dateDetails);
  } else {
    return Promise.reject("Bad weather so no date");
  }
}
const orderUber = (details) => {
  const message = `Get me an uber ASAP to ${details.location}, we are going on a date`;
  return Promise.resolve(message);
};

const myDate = () => {
  date()
    .then(orderUber)
    .then((msg) => {
      console.log(msg);
    })
    .catch((error) => {
      console.log(error);
    });
};

myDate();
console.log("After myDate has been called");
