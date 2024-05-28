module.exports = (app) => {
  const auth = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  // Login
  router.post("/signin", auth.login);

  // Logout
  router.post("/signout", auth.logout);

  app.use("/", router);
};
