module.exports = (app) => {
  const languageController = require("../controllers/language.controller.js");
  var router = require("express").Router();

  router.post("/", languageController.create);
  router.get("/", languageController.findAll);
  router.get("/:id", languageController.findOne);
  router.put("/:id", languageController.update);
  router.delete("/:id", languageController.delete);
  router.delete("/", languageController.deleteAll);
  app.use("/languages", router);
};
