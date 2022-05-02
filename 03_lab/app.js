const people = require("./people");
const stocks = require("./stocks");

async function main() {
  //  try {
  //     const peopledata = await people.getPeople();
  //     console.log(peopledata);
  //   } catch (e) {
  //     console.log(e);
  //   }

  try {
    const test = await people.getPersonById(
      "7989fa5e-8f3f-458d-ad58-23c8d9ef5a10"
    );
    console.log(test);
  } catch (e) {
    console.log(e);
  }

  try {
    const test = await people.sameEmail("harvard.edu");
    console.log(test);
  } catch (e) {
    console.log(e);
  }

  try {
    const test = await people.manipulateIp();
    console.log(test);
  } catch (e) {
    console.log(e);
  }

  try {
    const test = await people.sameBirthday("9", "25");
    console.log(test);
  } catch (e) {
    console.log(e);
  }

  try {
    const test = await stocks.listShareholders("Powell Industries, Inc.");
    console.log(test);
  } catch (e) {
    console.log(e);
  }

  try {
    const test = await stocks.totalShares("Aeglea BioTherapeutics, Inc.");
    console.log(test);
  } catch (e) {
    console.log(e);
  }

  try {
    const test = await stocks.listStocks("Grenville", "Pawelke");
    console.log(test);
  } catch (e) {
    console.log(e);
  }

  try {
    const test = await stocks.getStockById(
      "f652f797-7ca0-4382-befb-2ab8be914ff0"
    );
    console.log(test);
  } catch (e) {
    console.log(e);
  }
}

main();
