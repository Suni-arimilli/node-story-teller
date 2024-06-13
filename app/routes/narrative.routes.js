module.exports = (app) => {
  const narrativeController = require("../controllers/narrative.controller.js");
  var router = require("express").Router();

  router.post("/", narrativeController.create);
  router.get("/", narrativeController.findAll);
  router.get("/:id", narrativeController.findOne);
  router.put("/:id", narrativeController.update);
  router.delete("/:id", narrativeController.delete);
  router.delete("/", narrativeController.deleteAll);
  app.use("/narratives", router);
};
