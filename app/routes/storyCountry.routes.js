module.exports = (app) => {
  const storyCountryController = require("../controllers/storyCountry.controller.js");
  var router = require("express").Router();

  router.post("/", storyCountryController.create);
  router.get("/", storyCountryController.findAll);
  router.get("/:id", storyCountryController.findOne);
  router.put("/:id", storyCountryController.update);
  router.delete("/:id", storyCountryController.delete);
  router.delete("/", storyCountryController.deleteAll);
  app.use("/storyCountries", router);
};
