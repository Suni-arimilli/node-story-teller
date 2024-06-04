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

  // Update a story by ID
  router.put("/:id", storyController.update);

  // Delete a story by ID
  router.delete("/:id", storyController.delete);

  // Get stories by user ID
  router.get("/user/:userId", storyController.findByUserId);

  // Get stories by category ID
  router.get("/category/:categoryId", storyController.findByCategoryId);

  // Get stories by country ID
  router.get("/country/:countryId", storyController.findByCountryId);

  // Get stories by role ID
  router.get("/role/:roleId", storyController.findByRoleId);

  // Get stories by narrative ID
  router.get("/narrative/:narrativeId", storyController.findByNarrativeId);

  // Get stories by configuration ID
  router.get(
    "/configuration/:configurationId",
    storyController.findByConfigurationId
  );

  // Get stories by language ID
  router.get("/language/:languageId", storyController.findByLanguageId);
  app.use("/stories", router);
};
