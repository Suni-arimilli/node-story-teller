module.exports = (app) => {
    const express = require("express");
    const router = express.Router();
    const storyController = require("../controllers/story.controller");
  
    // Create a new story
    router.post("/", storyController.create);
  
    // Retrieve all stories
    router.get("/", storyController.findAll);
  
    // Retrieve a single story by ID
    router.get("/:id", storyController.findOne);
  
    // Get stories by user ID
    router.get("/user/:userId", storyController.findByUserId);

    app.use("/stories", router);
  };
  