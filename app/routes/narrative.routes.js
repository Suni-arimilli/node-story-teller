module.exports = (app) => {
    const narrativeController = require("../controllers/narrative.controller.js");
    var router = require("express").Router();
  
    router.get("/", narrativeController.findAll);
    app.use("/narratives", router);
  };
  