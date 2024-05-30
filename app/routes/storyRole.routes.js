module.exports = (app) => {
    const storyRoleController = require("../controllers/storyRole.controller.js");
    var router = require("express").Router();
  
    router.get("/", storyRoleController.findAll);
    app.use("/storyRoles", router);
  };
  