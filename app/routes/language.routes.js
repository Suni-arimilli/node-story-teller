module.exports = (app) => {
    const languageController = require("../controllers/language.controller.js");
    var router = require("express").Router();
  
    router.get("/", languageController.findAll);
    app.use("/languages", router);
  };
  