module.exports = (app) => {
    const categoryController = require("../controllers/category.controller.js");
    var router = require("express").Router();
  
    router.get("/", categoryController.findAll);
    app.use("/categories", router);
  };
  