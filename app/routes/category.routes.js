module.exports = (app) => {
  const categoryController = require("../controllers/category.controller.js");
  var router = require("express").Router();

  router.post("/", categoryController.create);
  router.get("/", categoryController.findAll);
  router.get("/:id", categoryController.findOne);
  router.put("/:id", categoryController.update);
  router.delete("/:id", categoryController.delete);
  router.delete("/", categoryController.deleteAll);
  app.use("/categories", router);
};
