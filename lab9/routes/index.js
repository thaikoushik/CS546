const userRoutes = require("./user");

const constructorMethod = (app) => {
  app.use("/login", userRoutes);
  app.use("/", userRoutes);

    app.use("*", (req, res) => {
        app.use("/", userRoutes);
    })
};

module.exports = constructorMethod;