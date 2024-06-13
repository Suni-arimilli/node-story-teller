module.exports = (app) => {
  const storyRoleController = require("../controllers/storyRole.controller.js");
  var router = require("express").Router();

  router.post("/", storyRoleController.create);
  router.get("/", storyRoleController.findAll);
  router.get("/:id", storyRoleController.findOne);
  router.put("/:id", storyRoleController.update);
  router.delete("/:id", storyRoleController.delete);
  router.delete("/", storyRoleController.deleteAll);
  app.use("/storyRoles", router);
};
