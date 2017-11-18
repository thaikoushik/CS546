const palindromeroutes = require("./palindrome");

const constructorMethod = (app) => {
  app.use("/", palindromeroutes);

    app.use("*", (req, res) => {
        app.use("/", palindromeroutes);
    })
};

module.exports = constructorMethod;