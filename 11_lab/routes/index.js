const path = require("path");

const constructorMethod = (app) => {
  app.use("/", (req, res) => {
    res.sendFile(path.resolve("index.html"));
  });

  app.use("*", (req, res) => {
    res.status(404);
  });
};
module.exports = constructorMethod;
