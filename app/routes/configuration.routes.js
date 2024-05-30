module.exports = (app) => {
    const configurationController = require("../controllers/configuration.controller.js");
    var router = require("express").Router();
  
    router.get("/", configurationController.findAll);
    app.use("/configurations", router);
  };
  