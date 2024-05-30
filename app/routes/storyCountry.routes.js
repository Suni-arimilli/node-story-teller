module.exports = (app) => {
    const storyCountryController = require("../controllers/storyCountry.controller.js");
    var router = require("express").Router();
  
    router.get("/", storyCountryController.findAll);
    app.use("/storyCountries", router);
  };
  