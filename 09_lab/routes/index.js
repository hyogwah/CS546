const constructorMethod = (app) => {
  app.get("/", (req, res) => {
    res.render("posts/index", { title: "Prime Numbers" });
  });

  app.use("*", (req, res) => {
    res.status(404).render("posts/error404", { title: "404 ERROR" });
  });
};

module.exports = constructorMethod;
