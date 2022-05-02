const bands = require("./data/bands");
const connection = require("./config/mongoConnection");

const main = async () => {
  const db = await connection.connectToDb();
  await db.dropDatabase();

  // 1
  let pinkFloyd = undefined;
  try {
    pinkFloyd = await bands.create(
      "Pink Floyd",
      ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
      "http://www.pinkfloyd.com",
      "EMI",
      [
        "Roger Waters",
        "David Gilmour",
        "Nick Mason",
        "Richard Wright",
        "Sid Barrett",
      ],
      1965
    );
  } catch (e) {
    console.log(pinkFloyd);
  }

  // 2
  console.log(pinkFloyd);

  // 3
  let ericBand = undefined;
  try {
    ericBand = await bands.create(
      "Hyogwah",
      ["Korean"],
      "http://www.ericsong.com",
      "AES",
      ["Eric Song", "SWJ"],
      2002
    );
  } catch (e) {
    console.log(ericBand);
  }

  // 4
  let queryAll = await bands.getAll();
  console.log(queryAll);

  // 5
  let thirdBand = undefined;
  try {
    thirdBand = await bands.create(
      "CS546",
      ["Patrick", "Hill"],
      "http://www.pathill.com",
      "NODE",
      ["Albert Chen", "Patrick Hill"],
      2022
    );
  } catch (e) {
    console.log(thirdBand);
  }

  //6
  console.log(thirdBand);

  //7
  try {
    pinkFloyd = await bands.rename(pinkFloyd["_id"].toString(), "Floyd Pink");
  } catch (e) {
    console.log(e.message);
  }

  //8
  console.log(pinkFloyd);

  //9
  await bands.remove(ericBand["_id"].toString());

  //10
  queryAll = await bands.getAll();
  console.log(queryAll);

  //11
  let errorBand = undefined;

  try {
    errorBand = await bands.create(
      1,
      ["Progressive Rock", "Psychedelic rock", "Classic Rock"],
      "http://www.pinkfloyd.com",
      "EMI",
      [
        "Roger Waters",
        "David Gilmour",
        "Nick Mason",
        "Richard Wright",
        "Sid Barrett",
      ],
      1965
    );
  } catch (e) {
    console.log(e.message);
  }

  //12
  try {
    await bands.remove("507f1f77bcf86cd799439012");
  } catch (e) {
    console.log(e.message);
  }

  await connection.closeConnection();
};

main();
