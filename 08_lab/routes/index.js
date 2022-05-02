const searchRoute = require("./searchshows");
const showRoute = require("./show");
const path = require("path");

const constructorMethod = (app) => {
  app.get("/", (req, res) => {
    res.render("posts/index", { title: "Show Finder" });
  });

  app.use("/searchshows", searchRoute);

  app.use("/show", showRoute);

  app.use("*", (req, res) => {
    res.status(404).render("posts/error404", { title: "404 ERROR" });
  });
};

module.exports = constructorMethod;
