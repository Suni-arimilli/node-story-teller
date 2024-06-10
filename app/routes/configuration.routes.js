module.exports = (app) => {
  const configurationController = require("../controllers/configuration.controller.js");
  var router = require("express").Router();

  router.post("/", configurationController.create);
  router.get("/", configurationController.findAll);
  router.get("/:id", configurationController.findOne);
  router.put("/:id", configurationController.update);
  router.delete("/:id", configurationController.delete);
  router.delete("/", configurationController.deleteAll);
  app.use("/configurations", router);
};
